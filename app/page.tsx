"use client";

import Default from "@/components/templates/Default";
import { useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const generatePreview = async () => {
    const element = contentRef.current;

    if (!element) return;

    // Capture the HTML as canvas
    const canvas = await html2canvas(element, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    // Set the image data as the preview
    setPreviewImg(imgData);
  };

  const downloadPdf = async () => {
    const element = contentRef.current;

    if (!element) return;

    // Capture the HTML as canvas
    const canvas = await html2canvas(element, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("document.pdf");
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35}>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
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
