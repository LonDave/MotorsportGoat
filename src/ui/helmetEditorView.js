// Generatore ed editor grafico SVG del casco e della tuta del pilota in tempo reale
export class HelmetRenderer {
  static generateHelmetSvg(config = {}, size = 120) {
    const primary = config.primaryColor || "#e10600";
    const secondary = config.secondaryColor || "#ffd000";
    const visor = config.visorColor || "#00d2be";
    const pattern = config.pattern || "stripes";
    const number = config.number || 77;
    const country = config.nationality || "ITA";

    // Mappatura riflessi visiera
    let visorFilter = "url(#goldShine)";
    let visorFill = visor;
    if (visor === "#00d2be") visorFill = "url(#chromeBlueGrad)";
    else if (visor === "#ffd700" || visor === "#ffd000") visorFill = "url(#goldGrad)";
    else if (visor === "#222222") visorFill = "#1a1a1a";

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="pilot-helmet-svg">
        <defs>
          <!-- Gradiente calotta 3D -->
          <radialGradient id="shellShine" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="${primary}"/>
            <stop offset="100%" stop-color="#050505"/>
          </radialGradient>

          <!-- Riflesso oro visiera -->
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff2a3"/>
            <stop offset="50%" stop-color="#ffd700"/>
            <stop offset="100%" stop-color="#b8860b"/>
          </linearGradient>

          <!-- Riflesso cromo blu visiera -->
          <linearGradient id="chromeBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a8f5ff"/>
            <stop offset="40%" stop-color="#00d2be"/>
            <stop offset="100%" stop-color="#0052a3"/>
          </linearGradient>

          <!-- Ombra alettone posteriore -->
          <linearGradient id="spoilerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#111111"/>
            <stop offset="100%" stop-color="${secondary}"/>
          </linearGradient>
        </defs>

        <!-- Sagoma Calotta Esterna Casco da Gara -->
        <path d="M 50 135 
                 C 25 125, 20 80, 50 45 
                 C 80 15, 135 15, 165 48 
                 C 185 70, 185 115, 160 145 
                 C 145 160, 115 168, 80 165 
                 C 60 162, 50 145, 50 135 Z" 
              fill="url(#shellShine)" stroke="#111111" stroke-width="3"/>

        <!-- Grafica e Livrea Secondaria -->
        ${pattern === "stripes" ? `
          <!-- Strisce Racing Frontali e Laterali -->
          <path d="M 55 52 C 90 28, 130 28, 160 52 L 152 64 C 125 42, 90 42, 63 64 Z" fill="${secondary}" />
          <path d="M 45 95 C 40 120, 70 148, 100 155 L 98 145 C 72 138, 48 115, 52 95 Z" fill="${secondary}" />
        ` : ''}

        ${pattern === "lightning" ? `
          <!-- Grafica a Saetta Tagliente -->
          <polygon points="45,65 95,50 80,75 130,55 90,110 110,85 65,135" fill="${secondary}" opacity="0.9" />
        ` : ''}

        ${pattern === "bicolor" ? `
          <!-- Livrea Bicolore Divido a Metà -->
          <path d="M 100 20 C 135 20, 165 48, 165 90 C 165 135, 140 162, 100 165 Z" fill="${secondary}" opacity="0.8" />
        ` : ''}

        <!-- Presa d'Aria Superiore (Aero Scoop) -->
        <path d="M 85 22 Q 100 18 115 22 L 110 32 Q 100 29 90 32 Z" fill="#222222" stroke="#444444" stroke-width="1"/>

        <!-- Alettone Posteriore / Spoiler Aerodinamico -->
        <path d="M 160 85 Q 185 92 178 120 Q 165 110 160 85 Z" fill="url(#spoilerGrad)" stroke="#222222"/>

        <!-- Apertura Visiera (Cornice Nera in Gomma) -->
        <path d="M 55 75 
                 Q 105 58 152 75 
                 Q 156 108 142 118 
                 Q 100 112 55 102 
                 Z" 
              fill="#080808" stroke="#000000" stroke-width="2"/>

        <!-- Vetro Visiera Iridato / Riflettente -->
        <path d="M 58 78 
                 Q 105 62 149 78 
                 Q 152 105 139 114 
                 Q 100 108 58 99 
                 Z" 
              fill="${visorFill}" opacity="0.95"/>

        <!-- Bagliore Aerodinamico Curvo sulla Visiera -->
        <path d="M 64 82 Q 105 69 140 82" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>

        <!-- Meccanismo Snodo Visiera Laterale (Pivot) -->
        <circle cx="150" cy="95" r="7" fill="#1f1f1f" stroke="#555" stroke-width="1.5"/>
        <circle cx="150" cy="95" r="2.5" fill="${secondary}"/>

        <!-- Mentoniera con Prese d'Aria Nere -->
        <path d="M 68 125 L 85 125 L 80 135 L 65 135 Z" fill="#1a1a1a"/>
        <path d="M 92 125 L 110 125 L 105 135 L 90 135 Z" fill="#1a1a1a"/>

        <!-- Numero di Gara Stilizzato sul Lato / Mentoniera -->
        <text x="75" y="152" font-family="'Orbitron', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" stroke="#000000" stroke-width="1">#${number}</text>

        <!-- Bandierina Nazionale sul retro -->
        <rect x="145" y="132" width="14" height="9" rx="1.5" fill="#222222" stroke="#444" stroke-width="0.5"/>
        <text x="152" y="139" font-size="6" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">${country}</text>
      </svg>
    `;
  }
}
