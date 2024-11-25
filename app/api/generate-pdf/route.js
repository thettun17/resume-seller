import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();
    const A4_HEIGHT = 1122;
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--hide-scrollbars",
        "--disable-web-security",
      ],
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Measure content height
    const contentHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(contentHeight);

    // Calculate required pages
    const totalPages = Math.ceil(contentHeight / A4_HEIGHT);
    const height = totalPages * A4_HEIGHT;
    // Add a style tag to define page breaks
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0;
        }

        .customHeight {
          height: ${height}px;
        }
      `,
    });

    const pdfBuffer = await page.pdf({
      displayHeaderFooter: true,
      headerTemplate:
        '<div style="font-size:16px;width:100%;text-align:center; margin: 10px 0;"></div>',
      footerTemplate:
        '<div style="font-size:16px;width:100%;text-align:center; margin: 10px 0;"></div>',
      printBackground: true,
      preferCSSPageSize: false,
      pageRanges: "1-5",
      format: "A4",
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
