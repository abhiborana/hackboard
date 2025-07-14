export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const { t } = searchParams;
  const element = `<div style="display:'flex';align-items: 'center';justify-content: 'center';background:'#262626';color:'white';">${t.toString().slice(0, 10)}</div>`;
  return Response.json({
    image: `https://via.assets.so/img.jpg?w=340&h=200&tc=white&bg=#262626&t=${t.toString().slice(0, 10)}`,
    element,
  });
}
