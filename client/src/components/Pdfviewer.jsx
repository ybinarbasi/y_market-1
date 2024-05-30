import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";



function Pdfviewer({ product, isvisible, onClose }) {


  const docs = [
    { uri: `http://localhost:5001/public/${product.pdf}` }, // Remote file
    // Local File 1672412280688_insan-neyle-yasar.pdf
  ];

  if (!isvisible) return null;
  return (

    <div className='fixed  inset-0 bg-opacity-25 backdrop-blur-sm z-50 '>

      <div className='flex   border' >

        <DocViewer

          style={{ width: 500, height: 1000 }}
          documents={docs}
          initialActiveDocument={docs[1]}
          pluginRenderers={DocViewerRenderers}
          theme={{
            primary: "#5296d8",
            secondary: "#ffffff",
            tertiary: "#5296d899",
            textPrimary: "#ffffff",
            textSecondary: "#5296d8",
            textTertiary: "#00000099",
            disableThemeScrollbar: true,
          }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: true,
            },
            csvDelimiter: ",", // "," as default,
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
        />

        <button onClick={() => onClose()} className=' h-16  hover:text-gray-500 text-center text-5xl'>Kapat</button>
        <div>

        </div>
      </div>
    </div>
  )

}

export default Pdfviewer