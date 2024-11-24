"use client";

import Default from "@/components/templates/Default";
import { useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    const content = contentRef.current?.outerHTML;
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (err) {
          console.warn("Could not load some CSS rules:", err);
          return "";
        }
      })
      .join("\n");

    if (!content || !styles) return;

    const htmlWithStyles = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${styles}</style>
        </head>
        <body>${content}</body>
      </html>
    `;

    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ htmlContent: htmlWithStyles }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to generate PDF.");
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="bg-[#edeeee]">
      <ResizablePanel defaultSize={35}>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65} className="mb-3">
        <div className="mx-3 relative h-full">
          <ScrollArea className="h-full">
            <Default ref={contentRef} />
          </ScrollArea>
          <div className="absolute bottom-2 left-0 right-0 rounded-lg bg-green-600 p-6">
            <div className="grid grid-cols-3 items-center">
              <button className="justify-self-start" onClick={downloadPdf}>
                Download PDF
              </button>
              <button className="justify-self-center" onClick={downloadPdf}>
                Download PDF
              </button>
              <button className="justify-self-end" onClick={downloadPdf}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
