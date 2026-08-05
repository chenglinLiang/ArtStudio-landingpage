/**
 * Welcome email for Artfolio early-access signups.
 *
 * Design language mirrors the landing page: warm paper white, deep ink,
 * a single muted-gold rule, museum-label typography.
 */

export const WELCOME_SUBJECT = "Your digital gallery is being prepared";

export const WELCOME_PREHEADER =
  "A new way to preserve, present, and share your artwork is coming.";

const C = {
  paper: "#f8f5f0",
  paperDeep: "#f1ece2",
  ink: "#111111",
  inkSoft: "#3a3633",
  inkMuted: "#6b655c",
  gold: "#b08d57",
  line: "#dcd4c6",
};

const SERIF =
  '"Playfair Display", "Times New Roman", Georgia, "STSong", serif';

const SANS =
  '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Helvetica Neue", Arial, sans-serif';


const STAGE = [
  {
    n: "01",
    t: "Capture",
    d: "Bring your artwork into the digital world."
  },
  {
    n: "02",
    t: "Restore",
    d: "Recover the colors and details your camera misses."
  },
  {
    n: "03",
    t: "Frame",
    d: "Present your work with gallery-quality frames."
  },
  {
    n: "04",
    t: "Exhibit",
    d: "Create your personal digital exhibition."
  },
  {
    n: "05",
    t: "Share",
    d: "Let your artwork reach new audiences."
  },
];


export function renderWelcomeHtml(email: string): string {

  const stages = STAGE.map((s) => {
    return `
      <tr>
        <td style="
          width:42px;
          vertical-align:top;
          padding:14px 0;
          font-family:${SANS};
          font-size:11px;
          letter-spacing:0.22em;
          color:${C.gold};
        ">
          ${s.n}
        </td>

        <td style="
          vertical-align:top;
          padding:14px 0;
          font-family:${SERIF};
          font-size:16px;
          color:${C.ink};
        ">
          ${s.t}
        </td>

        <td style="
          vertical-align:top;
          text-align:right;
          padding:14px 0 14px 16px;
          font-family:${SANS};
          font-size:13px;
          line-height:1.5;
          color:${C.inkMuted};
        ">
          ${s.d}
        </td>
      </tr>

      <tr>
        <td colspan="3"
          style="
            border-bottom:1px solid ${C.line};
            font-size:0;
            line-height:0;
          ">
          &nbsp;
        </td>
      </tr>
    `;
  }).join("");


  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${WELCOME_SUBJECT}</title>
</head>


<body style="
margin:0;
padding:0;
background-color:${C.paperDeep};
">


<div style="
display:none;
max-height:0;
overflow:hidden;
opacity:0;
color:${C.paperDeep};
">
${WELCOME_PREHEADER}
&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>



<table role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
background-color:${C.paperDeep};
">

<tr>

<td align="center"
style="
padding:40px 20px;
">


<table role="presentation"
width="560"
cellpadding="0"
cellspacing="0"
style="
width:560px;
max-width:100%;
background-color:${C.paper};
border:1px solid ${C.line};
border-radius:6px;
">


<tr>

<td style="
padding:48px 56px 40px 56px;
">


<!-- eyebrow -->

<p style="
margin:0 0 28px 0;
font-family:${SANS};
font-size:10px;
font-weight:600;
letter-spacing:0.28em;
text-transform:uppercase;
color:${C.gold};
text-align:center;
">
Early Access · Invitation Confirmed
</p>



<!-- gold line -->

<table align="center"
cellpadding="0"
cellspacing="0"
style="margin:0 auto 36px auto;">

<tr>
<td style="
width:48px;
border-top:1px solid ${C.gold};
font-size:0;
">
&nbsp;
</td>
</tr>

</table>



<!-- headline -->

<h1 style="
margin:0 0 28px 0;
font-family:${SERIF};
font-size:34px;
line-height:1.15;
letter-spacing:-0.01em;
color:${C.ink};
text-align:center;
font-weight:400;
">

Your digital gallery<br/>
is being prepared.

</h1>



<!-- story -->

<p style="
margin:0 0 18px 0;
font-family:${SANS};
font-size:15px;
line-height:1.75;
color:${C.inkSoft};
text-align:center;
">

Thank you for joining Artfolio.

Every artwork carries a story —
the texture of the canvas, the colors chosen by hand,
and the moments behind every brushstroke.

</p>



<p style="
margin:0 0 36px 0;
font-family:${SANS};
font-size:15px;
line-height:1.75;
color:${C.inkSoft};
text-align:center;
">

We are building Artfolio to help artists transform
physical creations into beautiful digital galleries,
while preserving the feeling of the original work.

</p>



<!-- stages -->

<p style="
margin:0 0 18px 0;
font-family:${SERIF};
font-size:18px;
color:${C.ink};
text-align:center;
">
Inside Artfolio
</p>


<table width="100%"
cellpadding="0"
cellspacing="0"
style="
border-top:1px solid ${C.line};
margin-bottom:36px;
">

${stages}

</table>



<!-- closing -->

<p style="
margin:0 0 8px 0;
font-family:${SERIF};
font-size:15px;
font-style:italic;
color:${C.ink};
text-align:center;
">

With care,

</p>


<p style="
margin:0 0 40px 0;
font-family:${SANS};
font-size:13px;
letter-spacing:0.04em;
color:${C.inkSoft};
text-align:center;
">

The Artfolio Studio

</p>



<table align="center"
cellpadding="0"
cellspacing="0">

<tr>
<td style="
width:120px;
border-top:1px solid ${C.line};
font-size:0;
">
&nbsp;
</td>
</tr>

</table>



<p style="
margin:24px 0 0 0;
font-family:${SANS};
font-size:11px;
line-height:1.7;
color:${C.inkMuted};
text-align:center;
">

You joined the first artists preparing their digital galleries.

</p>



</td>

</tr>

</table>



<p style="
margin:24px 0 0 0;
font-family:${SANS};
font-size:10px;
letter-spacing:0.18em;
text-transform:uppercase;
color:${C.inkMuted};
text-align:center;
">

Artfolio · Your art deserves a gallery.

</p>



</td>

</tr>

</table>


</body>
</html>
`;
}


function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}