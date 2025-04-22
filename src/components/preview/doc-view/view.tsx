"use client";
import styles from "./style.module.css";
import { useEffect, useRef } from "react";
import { getDocument } from "pdfjs-dist";
import { GlobalWorkerOptions, version } from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `//mozilla.github.io/pdf.js/build/pdf.worker.mjs`;

interface DocViewProps {
  url: string;
}

export default function DocView({ url }: DocViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      getDocument(url).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = canvasRef.current as HTMLCanvasElement;
          const context = canvas.getContext("2d");
          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
          }
        });
      });
    }
  }, []);
  return (
    <div className={styles.docView}>
      <canvas id="thumbnail" ref={canvasRef}></canvas>
    </div>
  );
}