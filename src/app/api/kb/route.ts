import { NextResponse } from 'next/server';
import { getKnowledgeBase, saveKnowledgeBase } from '@/lib/kb';

export async function GET() {
  const kb = getKnowledgeBase();
  return NextResponse.json(kb);
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== 'Basic YWRtaW46YWRtaW4=' && authHeader !== 'admin:admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const updated = saveKnowledgeBase(body);
    return NextResponse.json({ success: true, kb: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
