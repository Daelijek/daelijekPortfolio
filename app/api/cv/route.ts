import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Dedicated download endpoint: Chrome ignores the `download` attribute in some cases,
// an explicit attachment response always saves the file with a readable name.
export async function GET(): Promise<Response> {
  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'dias_yermek_cv.pdf'));
    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Dias_Yermek_CV.pdf"',
        'Content-Length': String(file.length),
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch {
    return new Response('CV not found', { status: 404 });
  }
}
