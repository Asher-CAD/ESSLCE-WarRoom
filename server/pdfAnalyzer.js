import fs from 'fs'

export async function extractTextFromPDF(filePath, maxPages = 25) {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
    
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(dataBuffer),
      useSystemFonts: true
    })
    
    const pdf = await loadingTask.promise
    const numPages = pdf.numPages
    const pagesToRead = Math.min(numPages, maxPages)
    let fullText = ''

    console.log(`📄 Scanning Table of Contents (Pages 1 to ${pagesToRead} of ${numPages})...`)

    for (let i = 1; i <= pagesToRead; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += `\n--- Page ${i} ---\n${pageText}`
    }

    return {
      success: true,
      text: fullText,
      pages: numPages
    }
  } catch (error) {
    console.error('PDF Error:', error.message)
    return {
      success: false,
      error: error.message,
      text: '',
      pages: 0
    }
  }
}