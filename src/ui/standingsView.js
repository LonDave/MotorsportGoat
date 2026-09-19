import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';

export class StandingsView {
  static currentTab = 'drivers'; // 'drivers' | 'teams'

  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const catData = career.getCurrentCategoryData();
    const seriesName = db.getSeriesName(careerData.currentCategory, player.discipline);
    const driverStandings = careerData.standings.drivers || [];
    const teamStandings = careerData.standings.teams || [];

    // Calcola leader points per calcolo distacco
    const leaderPoints = driverStandings[0]?.points || 0;

    container.innerHTML = `
      <div class="page-container standings-page">
        <!-- HEADER DELLA PAGINA CLASSIFICHE -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">CAMPIONATO MONDIALE • STAGIONE ${careerData.seasonNumber} (${careerData.currentYear})</span>
            <h2 class="page-main-title">📊 CLASSIFICHE UFFICIALI: ${seriesName.toUpperCase()}</h2>
            <p class="page-desc">Graduatorie mondiali aggiornate in tempo reale dopo ogni round del calendario. Punti, vittorie, podi e distacchi ufficiali.</p>
          </div>

          <!-- TAB SWITCHER CLASSIFICHE -->
          <div class="standings-tab-switcher">
            <button id="tab-btn-drivers" class="sub-tab-btn ${this.currentTab === 'drivers' ? 'active' : ''}">
              👤 Classifica Piloti
            </button>
            <button id="tab-btn-teams" class="sub-tab-btn ${this.currentTab === 'teams' ? 'active' : ''}">
              🏎️ Classifica Costruttori
            </button>
          </div>
        </div>

        <!-- CONTENUTO TAB ATTIVA -->
        ${this.currentTab === 'drivers' ? this.renderDriversTable(driverStandings, player, careerData, catData, leaderPoints) : this.renderTeamsTable(teamStandings, player, careerData, catData)}
      </div>
    `;

    this.bindEvents(container, onNavigate);
  }

  static renderDriversTable(driverStandings, player, careerData, catData, leaderPoints) {
    const activeDrivers = career.getActiveRoster(catData.id);
    const activeDriverIds = new Set(activeDrivers.map(d => d.id));

    // Mostra solo il giocatore e i piloti effettivamente attivi nella categoria corrente (esclude svincolati)
    const filteredStandings = driverStandings.filter(entry => entry.isPlayer || activeDriverIds.has(entry.driverId));
    const currentLeaderPts = filteredStandings[0]?.points || 0;

    return `
      <div class="standings-card-full">
        <div class="table-responsive">
          <table class="motorsport-table full-table">
            <thead>
              <tr>
                <th class="text-center col-pos" style="width: 50px;">POS</th>
                <th class="col-driver">PILOTA</th>
                <th class="col-team">SCUDERIA</th>
                <th class="text-center col-wins">VITTORIE</th>
                <th class="text-center col-podiums">PODI</th>
                <th class="text-center col-poles">POLE</th>
                <th class="text-right col-gap">DISTACCO</th>
                <th class="text-right col-points">PUNTI</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStandings.map((entry, index) => {
                const isPlayer = entry.isPlayer;
                const driverName = isPlayer 
                  ? `${player.firstName} ${player.lastName} "${player.nickname}"`
                  : db.getDriverName(entry.driverId, player.discipline);
                
                const activeDriverObj = activeDrivers.find(r => r.id === entry.driverId);
                const driverTeamId = isPlayer 
                  ? careerData.currentTeamId 
                  : (careerData.teamDriverOverrides?.[entry.driverId] || activeDriverObj?.teamId || catData.roster?.find(r => r.id === entry.driverId)?.teamId || "f1_generic");
                
                const teamInfo = db.getTeam(driverTeamId, player.discipline);
                const gap = index === 0 ? 'LEADER' : `-${currentLeaderPts - (entry.points || 0)} pts`;
                const pos = index + 1;

                return `
                  <tr class="${isPlayer ? 'player-standings-row highlight' : ''}">
                    <td class="pos-cell text-center col-pos">
                      <span class="pos-badge pos-${pos}">${pos}</span>
                    </td>
                    <td class="driver-cell col-driver">
                      <div class="driver-cell-flex">
                        <span class="team-color-strip" style="background:${teamInfo.color || '#888'}"></span>
                        <div class="driver-names-box">
                          <strong class="pilot-name">${driverName}</strong>
                          ${isPlayer ? '<span class="you-badge">IL TUO PILOTA</span>' : ''}
                        </div>
                      </div>
                    </td>
                    <td class="team-cell col-team">
                      <span class="team-bullet-small" style="background:${teamInfo.color || '#888'}"></span>
                      ${teamInfo?.displayName || teamInfo?.realName || teamInfo?.fictionalName || teamInfo?.name || 'Scuderia'}
                    </td>
                    <td class="stat-cell text-center col-wins"><strong>${entry.wins || 0}</strong></td>
                    <td class="stat-cell text-center col-podiums">${entry.podiums || 0}</td>
                    <td class="stat-cell text-center col-poles">${entry.poles || 0}</td>
                    <td class="gap-cell text-right col-gap"><small>${gap}</small></td>
                    <td class="points-cell text-right col-points">
                      <span class="points-value">${entry.points || 0}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderTeamsTable(teamStandings, player, careerData, catData) {
    // Ordina team standings decrescente per punti
    const sortedTeams = [...teamStandings].sort((a, b) => (b.points || 0) - (a.points || 0));
    const leaderPoints = sortedTeams[0]?.points || 0;

    return `
      <div class="standings-card-full">
        <div class="table-responsive">
          <table class="motorsport-table full-table">
            <thead>
              <tr>
                <th class="text-center col-pos" style="width: 50px;">POS</th>
                <th class="col-team">COSTRUTTORE / SCUDERIA</th>
                <th class="col-lineup">LINEUP PILOTI ${careerData.currentYear}</th>
                <th class="text-center col-pace">PASSO MEZZO</th>
                <th class="text-right col-gap">DISTACCO</th>
                <th class="text-right col-points">PUNTI</th>
              </tr>
            </thead>
            <tbody>
              ${sortedTeams.map((entry, index) => {
                const teamInfo = db.getTeam(entry.teamId, player.discipline);
                const isPlayerTeam = entry.teamId === careerData.currentTeamId;
                const pos = index + 1;
                const gap = index === 0 ? 'LEADER' : `-${leaderPoints - (entry.points || 0)} pts`;

                // Trova i piloti di questa scuderia (esclude i piloti sostituiti dal giocatore)
                const activeDrivers = career.getActiveRoster(catData.id);
                const teamDrivers = activeDrivers
                  .filter(r => r.teamId === entry.teamId)
                  .map(r => db.getDriverName(r.id, player.discipline));

                if (isPlayerTeam) {
                  teamDrivers.unshift(`${player.firstName} ${player.lastName} (TU)`);
                }

                return `
                  <tr class="${isPlayerTeam ? 'player-standings-row highlight' : ''}">
                    <td class="pos-cell text-center col-pos">
                      <span class="pos-badge pos-${pos}">${pos}</span>
                    </td>
                    <td class="team-cell col-team">
                      <div class="team-cell-flex">
                        <span class="team-color-strip" style="background:${teamInfo.color || '#888'}"></span>
                        <div>
                          <strong class="team-title">${teamInfo?.displayName || teamInfo?.realName || teamInfo?.fictionalName || teamInfo?.name || 'Scuderia'}</strong>
                          ${isPlayerTeam ? '<span class="you-badge">LA TUA SCUDERIA</span>' : ''}
                        </div>
                      </div>
                    </td>
                    <td class="lineup-cell col-lineup">
                      <small>${teamDrivers.join(' • ')}</small>
                    </td>
                    <td class="stat-cell text-center col-pace">
                      <span class="car-pace-tag">${player.discipline === 'auto' ? teamInfo.carPace : teamInfo.bikePace}/99</span>
                    </td>
                    <td class="gap-cell text-right col-gap"><small>${gap}</small></td>
                    <td class="points-cell text-right col-points">
                      <span class="points-value">${entry.points || 0}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static bindEvents(container, onNavigate) {
    const driversTabBtn = container.querySelector('#tab-btn-drivers');
    if (driversTabBtn) {
      driversTabBtn.onclick = () => {
        sound.playClick();
        this.currentTab = 'drivers';
        this.render(container, onNavigate);
      };
    }

    const teamsTabBtn = container.querySelector('#tab-btn-teams');
    if (teamsTabBtn) {
      teamsTabBtn.onclick = () => {
        sound.playClick();
        this.currentTab = 'teams';
        this.render(container, onNavigate);
      };
    }
  }
}
