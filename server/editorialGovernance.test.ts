import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { appRouter } from "./routers";

const projectRoot = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(projectRoot, relative), "utf8");

describe("gouvernance éditoriale arbitré", () => {
  it("empêche l’agent de publier automatiquement les contenus générés", () => {
    const source = read("server/journalists/admin-agent.ts");
    expect(source).toContain("isPublished: false");
    expect(source).toContain('status: "generating" | "drafted" | "failed"');
    expect(source).not.toContain("isPublished: true,");
  });

  it("empêche également l’intégration automatisée de contourner l’arbitrage", () => {
    const source = read("server/routers.ts");
    const n8nBlock = source.slice(source.indexOf("n8n: router"));
    expect(n8nBlock).toContain("isPublished: false");
    expect(n8nBlock).toContain('status: "draft"');
    expect(n8nBlock).not.toContain("isPublished: true");
  });

  it("définit une signature par défaut Bensirac pour l’éditorial et Abdou Fatah Fall hors éditorial", async () => {
    const { resolveDefaultEditorialSignature } = await import("./editorialGovernance");
    expect(resolveDefaultEditorialSignature(30009)).toMatchObject({ authorId: 30001, useAlias: true, signature: "bensirac" });
    expect(resolveDefaultEditorialSignature(30008)).toMatchObject({ authorId: 30001, useAlias: false, signature: "abdou_fatah_fall" });
  });

  it("exige une confirmation d’approbation dans les procédures d’administration", () => {
    const source = read("server/routers.ts");
    expect(source).toContain("approvalConfirmedByFatah");
    expect(source).toContain("Arbitrage explicite de Fatah requis avant publication.");
    expect(source).toContain("approvalStatus = \"approved\"");
  });

  it("réserve la grande Une aux seuls éditoriaux publiés et approuvés", () => {
    const dbSource = read("server/db.ts");
    const homeSource = read("client/src/pages/Home.tsx");
    const routerSource = read("server/routers.ts");
    expect(dbSource).toContain("getApprovedHomepageEditorial");
    expect(dbSource).toContain("eq(editorials.categoryId, 30009)");
    expect(dbSource).toContain('eq(editorials.type, "editorial")');
    expect(dbSource).toContain('eq(editorials.approvalStatus, "approved")');
    expect(homeSource).toContain("trpc.editorials.homepageEditorial.useQuery()");
    expect(homeSource).not.toContain("latestThree?.[0]");
    expect(routerSource).toContain('type: editorialFormatSchema.default("analysis")');
    expect(routerSource).toContain("La Une est réservée à un éditorial approuvé, publié et classé dans la rubrique Éditorial.");
  });

  it("refuse au niveau du CRUD la promotion d’une analyse, même validée, dans la grande Une", async () => {
    const caller = appRouter.createCaller({
      user: {
        id: 1,
        openId: "fatah-test",
        name: "Fatah",
        email: null,
        loginMethod: "manus",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: { headers: {} },
      res: {},
    } as any);

    await expect(caller.editorials.create({
      title: "Analyse non éligible à la Une",
      content: "Texte de contrôle.",
      categoryId: 30009,
      type: "analysis",
      isPublished: true,
      isFeatured: true,
      approvalConfirmedByFatah: true,
    })).rejects.toMatchObject({ code: "PRECONDITION_FAILED" });
  });

  it("programme uniquement un rappel d’arbitrage non génératif et non publiant", () => {
    const source = read("server/editorialGovernance.ts");
    const serverSource = read("server/_core/index.ts");
    expect(source).toContain('WEEKLY_EDITORIAL_REMINDER_CRON = "0 30 8 * * 1"');
    expect(source).toContain("generated: false, published: false");
    expect(serverSource).toContain("editorial-arbitration-reminder");
  });
});
