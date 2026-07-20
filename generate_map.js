const fs = require('fs');

// We have 15 dusuns in a roughly 5x3 layout, but we want it to look organic and irregular, like a real map.
// Let's use a Voronoi diagram. Since we can't easily install d3-delaunay without altering package.json, 
// we will generate irregular polygons manually but with lots of random jitter and natural curves.

const width = 730;
const height = 520;

const dusunList = [
  // Utara (North)
  { id: 'tunjang-utara', name: 'Tunjang Utara', color: '#0d9488', cx: 120, cy: 110 },
  { id: 'pesinggahan', name: 'Pesinggahan', color: '#0284c7', cx: 240, cy: 130 },
  { id: 'pagutan-utara', name: 'Pagutan Utara', color: '#059669', cx: 380, cy: 100 },
  { id: 'lombok-daye', name: 'Lombok Daye', color: '#4f46e5', cx: 520, cy: 120 },
  { id: 'ld-buwuh', name: 'LD. Buwuh', color: '#dc2626', cx: 640, cy: 140 },
  
  // Tengah (Middle)
  { id: 'jejeneng', name: 'Jejeneng', color: '#d97706', cx: 90, cy: 260 },
  { id: 'tunjang-timur', name: 'Tunjang Timur', color: '#0e7490', cx: 210, cy: 270 },
  { id: 'genteng', name: 'Genteng', color: '#78716c', cx: 350, cy: 250 },
  { id: 'sangkawana', name: 'Sangkawana', color: '#db2777', cx: 480, cy: 280 },
  { id: 'ld-gocek', name: 'LD. Gocek', color: '#0891b2', cx: 620, cy: 290 },

  // Selatan (South)
  { id: 'tunjang-barat', name: 'Tunjang Barat', color: '#65a30d', cx: 140, cy: 400 },
  { id: 'pagutan-selatan', name: 'Pagutan Selatan', color: '#047857', cx: 270, cy: 420 },
  { id: 'sangkawati', name: 'Sangkawati', color: '#ea580c', cx: 400, cy: 410 },
  { id: 'lombok-lauk', name: 'Lombok Lauk', color: '#7c3aed', cx: 510, cy: 430 },
  { id: 'gubuk-baru', name: 'Gubuk Baru', color: '#9333ea', cx: 610, cy: 410 },
];

// Add some random jitter to centers to make it less grid-like
dusunList.forEach(d => {
  d.cx += (Math.random() - 0.5) * 40;
  d.cy += (Math.random() - 0.5) * 40;
});

// A simple Voronoi implementation for 15 points
const points = dusunList.map(d => ({ x: d.cx, y: d.cy }));

function distance(p1, p2) {
  return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

// Generate a grid of points and assign them to the nearest center
const resolution = 10; // every 10 pixels
const cols = Math.floor(width / resolution);
const rows = Math.floor(height / resolution);

// Outline of the village - make it an irregular shape
function isInsideVillage(x, y) {
  // A generic organic blob that fits the 730x520 canvas
  const centerX = width / 2;
  const centerY = height / 2;
  const angle = Math.atan2(y - centerY, x - centerX);
  const radius = Math.sqrt((x - centerX)**2 + (y - centerY)**2);
  
  // Create an irregular radius based on angle
  const maxRadius = 240 
    + 30 * Math.sin(3 * angle) 
    + 20 * Math.cos(5 * angle)
    + 40 * Math.sin(2 * angle - 1);
    
  return radius <= maxRadius;
}

// To create SVG paths from Voronoi, we need the boundary of each region.
// An easier way is to use a marching squares approach or just output the SVG as a series of connected points,
// but since we want smooth SVG paths without external libraries, we can just hand-craft a set of shared vertices!

const V = {};
let vIdx = 0;
function createVertex(x, y) {
  const id = 'v' + vIdx++;
  V[id] = { x: x + (Math.random()-0.5)*20, y: y + (Math.random()-0.5)*20 };
  return id;
}

// Let's manually define a mesh of vertices that is organic.
// 4 horizontal lines of vertices (top, mid-top, mid-bot, bot)
// 6 vertical lines of vertices
const mesh = [];
for (let r = 0; r < 4; r++) {
  const row = [];
  for (let c = 0; c < 6; c++) {
    // base grid
    let bx = 60 + c * 120;
    let by = 60 + r * 130;
    
    // add heavy irregularity
    bx += (Math.random() - 0.5) * 60;
    by += (Math.random() - 0.5) * 60;
    
    // pinch the middle, expand the edges, etc.
    if (r === 0 || r === 3) bx += (Math.random() - 0.5) * 40;
    
    row.push(createVertex(bx, by));
  }
  mesh.push(row);
}

// Map each dusun to a face in the mesh
// A face at (r, c) uses vertices:
// top-left: mesh[r][c]
// top-right: mesh[r][c+1]
// bot-right: mesh[r+1][c+1]
// bot-left: mesh[r+1][c]

// But we can add intermediate points on the edges to make them curved!
function generateCurvedEdge(v1, v2) {
  const p1 = V[v1];
  const p2 = V[v2];
  
  // mid point
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  
  // offset orthogonally
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  
  const nx = -dy / len;
  const ny = dx / len;
  
  // random offset
  const offset = (Math.random() - 0.5) * 30;
  
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  
  return `Q ${cx.toFixed(1)} ${cy.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

let code = '';
let index = 0;
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 5; c++) {
    const dusun = dusunList[index++];
    
    const tl = mesh[r][c];
    const tr = mesh[r][c+1];
    const br = mesh[r+1][c+1];
    const bl = mesh[r+1][c];
    
    // To ensure edges perfectly match, we should compute the edge path once and reuse it.
    // However, SVG Q commands can just be defined consistently if we just use L for now,
    // or we can just use the vertices directly with L to ensure perfect snapping without gaps.
    // Let's just use L (lines) but with enough vertices it looks organic, 
    // OR we use C with fixed control points for each edge.
    
    // To make it look extremely organic without gaps, we just use straight lines between the irregular mesh points,
    // BUT we add an extra intermediate vertex for every edge.
  }
}

// Actually, instead of generating it, I will output the exact React code to replace the dusunData with a highly detailed hand-crafted organic SVG path layout that I generate via this script.

const edges = {};
function getEdgePath(v1, v2) {
  const key = v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
  if (!edges[key]) {
    const p1 = V[v1];
    const p2 = V[v2];
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const nx = -dy / len;
    const ny = dx / len;
    const offset = (Math.random() - 0.5) * 40; // curvy edges
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    edges[key] = { cx, cy };
  }
  
  const c = edges[key];
  return `Q ${c.cx.toFixed(1)} ${c.cy.toFixed(1)}, ${V[v2].x.toFixed(1)} ${V[v2].y.toFixed(1)}`;
}

let dusunDataStr = 'const dusunData: DusunData[] = [\n';
let outerBoundaryStr = 'const outerBoundary =\n  ';
let outerPath = [];

index = 0;
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 5; c++) {
    const dusun = dusunList[index++];
    const tl = mesh[r][c];
    const tr = mesh[r][c+1];
    const br = mesh[r+1][c+1];
    const bl = mesh[r+1][c];
    
    // Forward edges
    const eTop = getEdgePath(tl, tr);
    const eRight = getEdgePath(tr, br);
    const eBottom = getEdgePath(br, bl);
    const eLeft = getEdgePath(bl, tl);
    
    const pTL = V[tl];
    const path = `M ${pTL.x.toFixed(1)} ${pTL.y.toFixed(1)} ${eTop} ${eRight} ${eBottom} ${eLeft} Z`;
    
    // Compute centroid for label
    const labelX = (V[tl].x + V[tr].x + V[br].x + V[bl].x) / 4;
    const labelY = (V[tl].y + V[tr].y + V[br].y + V[bl].y) / 4;
    
    dusunDataStr += `  {
    id: '${dusun.id}',
    name: '${dusun.name}',
    color: '${dusun.color}',
    path: '${path}',
    labelX: ${labelX.toFixed(1)}, labelY: ${labelY.toFixed(1)},
  },\n`;
  }
}
dusunDataStr += '];\n';

// Construct outer boundary
const topEdges = [];
for(let c=0; c<5; c++) topEdges.push({from: mesh[0][c], to: mesh[0][c+1]});
const rightEdges = [];
for(let r=0; r<3; r++) rightEdges.push({from: mesh[r][5], to: mesh[r+1][5]});
const botEdges = [];
for(let c=4; c>=0; c--) botEdges.push({from: mesh[3][c+1], to: mesh[3][c]});
const leftEdges = [];
for(let r=2; r>=0; r--) leftEdges.push({from: mesh[r+1][0], to: mesh[r][0]});

const allOuterEdges = [...topEdges, ...rightEdges, ...botEdges, ...leftEdges];
const startV = V[allOuterEdges[0].from];
let outerStr = `'M ${startV.x.toFixed(1)} ${startV.y.toFixed(1)} ' +\n  `;

allOuterEdges.forEach((edge, i) => {
  const e = getEdgePath(edge.from, edge.to);
  outerStr += `'${e} '`;
  if (i < allOuterEdges.length - 1) {
    if (i % 2 === 0) outerStr += ' +\n  ';
  } else {
    outerStr += ' + \n  \'Z\';';
  }
});

fs.writeFileSync('generated_map.txt', dusunDataStr + '\n' + outerStr);
console.log('Map generated successfully in generated_map.txt');
