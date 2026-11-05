const MMSI = 477333500;
const AIS_API = "https://ais.openwaters.io/v1";
const VOYAGE_START = "2026-10-16T00:00:00Z";
const SHANGHAI_ETA = new Date("2026-12-02T00:00:00Z");

const ports = [
  { id: "piraeus", name: "比雷埃夫斯", en: "Piraeus", code: "GRPIR", lat: 37.942, lon: 23.635, eta: "10/16", etd: "10/19", etaISO: "2026-10-16", etdISO: "2026-10-19", offset: [10, 10], anchor: "left" },
  { id: "fos", name: "福斯", en: "Fos-sur-Mer", code: "FRFOS", lat: 43.395, lon: 4.884, eta: "10/23", etd: "10/25", etaISO: "2026-10-23", etdISO: "2026-10-25", offset: [-12, -25], anchor: "right" },
  { id: "genoa", name: "热那亚", en: "Genoa", code: "ITGOA", lat: 44.405, lon: 8.925, eta: "10/28", etd: "11/01", etaISO: "2026-10-28", etdISO: "2026-11-01", offset: [12, -25], anchor: "left" },
  { id: "valencia", name: "瓦伦西亚", en: "Valencia", code: "ESVLC", lat: 39.4317, lon: -0.3183, eta: "11/01", etd: "11/04", etaISO: "2026-11-01", etdISO: "2026-11-04", offset: [14, 18], anchor: "left" },
  { id: "suez", name: "苏伊士运河", en: "Suez Canal", code: "EGSUZ", lat: 30.45, lon: 32.35, eta: "11/07", etd: "11/08", etaISO: "2026-11-07", etdISO: "2026-11-08", offset: [12, -12], anchor: "left" },
  { id: "singapore", name: "新加坡", en: "Singapore", code: "SGSIN", lat: 1.264, lon: 103.84, eta: "11/22", etd: "11/23", etaISO: "2026-11-22", etdISO: "2026-11-23", offset: [12, 12], anchor: "left" },
  { id: "qingdao", name: "青岛", en: "Qingdao", code: "CNQDG", lat: 36.067, lon: 120.25, eta: "11/30", etd: "12/01", etaISO: "2026-11-30", etdISO: "2026-12-01", offset: [-10, -25], anchor: "right" },
  { id: "shanghai", name: "上海", en: "Shanghai", code: "CNSHA", lat: 31.23, lon: 121.5, eta: "12/02", etd: "12/04", etaISO: "2026-12-02", etdISO: "2026-12-04", offset: [14, -12], anchor: "left" },
  { id: "ningbo", name: "宁波", en: "Ningbo", code: "CNNGB", lat: 29.87, lon: 121.85, eta: "12/04", etd: "12/05", etaISO: "2026-12-04", etdISO: "2026-12-05", offset: [14, 8], anchor: "left" },
  { id: "kaohsiung", name: "高雄", en: "Kaohsiung", code: "TWKHH", lat: 22.61, lon: 120.29, eta: "12/07", etd: "12/08", etaISO: "2026-12-07", etdISO: "2026-12-08", offset: [-14, -20], anchor: "right" },
  { id: "hongkong", name: "香港", en: "Hong Kong", code: "HKHKG", lat: 22.29, lon: 114.15, eta: "12/09", etd: "12/10", etaISO: "2026-12-09", etdISO: "2026-12-10", offset: [-14, 22], anchor: "right" },
  { id: "yantian", name: "盐田", en: "Yantian", code: "CNYTN", lat: 22.58, lon: 114.28, eta: "12/10", etd: "12/11", etaISO: "2026-12-10", etdISO: "2026-12-11", offset: [14, -24], anchor: "left" }
];

const legWaypoints = {
  "piraeus-fos": [[37.2, 21.5], [37.6, 16.2], [36.4, 15.5], [36.4, 12.5], [37.5, 10.5], [38.2, 9.5], [38.3, 6.5], [40.3, 4.8], [42.4, 4.9]],
  "fos-genoa": [[42.9, 6.2], [43.1, 7.8]],
  "genoa-valencia": [[42.6, 8.1], [41.1, 5.3], [39.9, 1.7]],
  "valencia-suez": [[38.7, 0.2], [37.4, 2.8], [37.3, 6.5], [37.6, 10.8], [36.7, 13], [36, 17], [34.5, 22], [32.8, 27.5], [31.6, 31.5], [31.3, 32.32], [30.8, 32.34]],
  "suez-singapore": [[29.95, 32.55], [28.4, 33.4], [26, 35.2], [23.5, 36.8], [20.5, 38.4], [17.3, 40.1], [14.5, 41.8], [12.6, 43.4], [12.2, 44.8], [12.5, 47.5], [12.5, 51.5], [11.5, 52.5], [8, 55], [5.4, 60], [5.7, 68], [6, 75], [5.7, 80.4], [5.8, 85], [6, 91], [6.2, 95.2], [6, 98], [5, 99.5], [3.5, 100.5], [2.5, 101.2], [1.8, 102.5], [1.3, 102.8], [0.9, 103.2], [1.15, 103.6]],
  "singapore-qingdao": [[0.7, 104.8], [0.6, 105.5], [1.2, 106.2], [3.2, 106.8], [7, 107.2], [12, 110], [17, 112], [20, 115], [22.2, 117], [23.5, 119], [24.5, 120], [25.5, 120.5], [26.5, 121], [28.2, 122], [31.2, 123], [33.4, 122.8], [35.1, 121.5]],
  "qingdao-shanghai": [[34.7, 121.4], [33, 122.1], [31.8, 122.4], [31.6, 122.4], [31.45, 121.9]],
  "shanghai-ningbo": [[31.3, 122.7], [30.5, 123.3], [29.6, 123], [29.3, 122.5], [29.55, 121.95], [29.75, 122.05]],
  "ningbo-kaohsiung": [[28.2, 122], [26.3, 121.3], [24.6, 120.4], [23.3, 119.5], [22.6, 119.8]],
  "kaohsiung-hongkong": [[22.2, 119.3], [22.1, 117.2]],
  "hongkong-yantian": [[22.25, 114.5], [22.42, 114.55]]
};

const lastKnown = {
  geometry: { coordinates: [-0.3183217, 39.43166] },
  properties: { mmsi: MMSI, name: "OOCL HONG KONG", near: "Valencia, Spain", seen: "2026-11-05T06:27:54Z", sog: 0, cog: 230.9, heading: 113, draught: 11.7, nav_status: 5, source: "aishub" }
};

const navStates = {
  0: "在航",
  1: "锚泊",
  2: "失控",
  3: "操纵受限",
  4: "吃水受限",
  5: "系泊中",
  6: "搁浅",
  7: "捕捞作业",
  8: "帆船在航",
  15: "状态未知"
};

let map;
let actualLine;
let futureLine;
let shipMarker;
let shipPosition = null;
let shipSeen = null;
let actualCoordinates = [];
let actualSegments = [];
let following = false;
let socket;
let reconnectTimer;
let reconnectAttempts = 0;
let toastTimer;
let currentPortIndex = 3;
let shipAtPort = true;
let vesselState = {};
const portLayers = new Map();

function portLatLng(port) {
  return [port.lat, port.lon];
}

function buildFullRoute() {
  const route = [portLatLng(ports[0])];
  for (let i = 0; i < ports.length - 1; i += 1) {
    const key = `${ports[i].id}-${ports[i + 1].id}`;
    route.push(...(legWaypoints[key] || []), portLatLng(ports[i + 1]));
  }
  return route;
}

const fullRoute = buildFullRoute();

function initMap() {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: true,
    minZoom: 1,
    maxZoom: 12,
    worldCopyJump: true,
    preferCanvas: true
  });
  map.attributionControl.setPrefix(false);
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 16,
    attribution: "Basemap &copy; <a href=\"https://www.esri.com/\" target=\"_blank\">Esri</a> &copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors"
  }).addTo(map);
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 16,
    opacity: 0.65,
    interactive: false
  }).addTo(map);

  actualLine = L.polyline([], { color: "#76f7d1", weight: 2.2, opacity: 0.95, lineCap: "round", lineJoin: "round", interactive: false }).addTo(map);
  futureLine = L.polyline([], { color: "#8de9d3", weight: 1.7, opacity: 0.8, dashArray: "7 9", lineCap: "round", interactive: false }).addTo(map);

  ports.forEach((port, index) => {
    const circle = L.circleMarker(portLatLng(port), {
      radius: index === 3 ? 4.5 : 3.5,
      className: "port-circle",
      color: index === 3 ? "#76f7d1" : "#799298",
      weight: index === 3 ? 1.8 : 1.2,
      fillColor: "#0b1a1f",
      fillOpacity: 1,
      bubblingMouseEvents: false
    }).addTo(map);
    circle.bindTooltip(`${port.name} · ETA ${port.eta}`, { direction: "top" });
    circle.on("click", () => focusPort(index));
    const transform = port.anchor === "right"
      ? `translate(calc(-100% + ${port.offset[0]}px), ${port.offset[1]}px)`
      : `translate(${port.offset[0]}px, ${port.offset[1]}px)`;
    const label = L.marker(portLatLng(port), {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({
        className: "port-label-icon",
        html: `<span class="port-label-text" data-port-label="${port.id}" style="transform:${transform};text-align:${port.anchor}">${port.name}<small>${port.en}</small></span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      })
    }).addTo(map);
    portLayers.set(port.id, { circle, label });
  });

  fitFullRoute();
  const view = new URLSearchParams(window.location.search).get("view");
  if (view) {
    const [lat, lon, zoom] = view.split(",").map(Number);
    if (Number.isFinite(lat) && Number.isFinite(lon) && Number.isFinite(zoom)) map.setView([lat, lon], zoom, { animate: false });
  }
}

function buildTimeline() {
  const timeline = document.getElementById("timeline");
  timeline.replaceChildren();
  ports.forEach((port, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "timeline-item";
    button.dataset.portIndex = String(index);
    button.setAttribute("aria-label", `${port.name}，预计 ${port.eta} 到港，${port.etd} 离港`);
    button.innerHTML = `<span class="timeline-dot"></span><span class="timeline-name">${port.name}</span><span class="timeline-date">${port.eta} — ${port.etd}</span>`;
    button.addEventListener("click", () => focusPort(index));
    timeline.append(button);
  });
}

function updatePortStates() {
  const now = Date.now();
  let scheduleIndex = ports.findIndex((port) => now <= new Date(`${port.etdISO}T23:59:59Z`).getTime());
  if (scheduleIndex < 0) scheduleIndex = ports.length - 1;
  currentPortIndex = scheduleIndex;
  shipAtPort = false;

  if (shipPosition) {
    const nearest = ports.reduce((best, port, index) => {
      const distance = map.distance(shipPosition, portLatLng(port));
      return distance < best.distance ? { index, distance } : best;
    }, { index: scheduleIndex, distance: Infinity });
    if (nearest.distance < 45000) {
      currentPortIndex = nearest.index;
      shipAtPort = true;
    }
  }

  ports.forEach((port, index) => {
    const state = index < currentPortIndex ? "is-past" : index === currentPortIndex ? "is-current" : "is-future";
    const item = document.querySelector(`[data-port-index="${index}"]`);
    item?.classList.remove("is-past", "is-current", "is-future");
    item?.classList.add(state);
    const label = document.querySelector(`[data-port-label="${port.id}"]`);
    label?.classList.remove("is-past", "is-current", "is-future");
    label?.classList.add(state);
    const layers = portLayers.get(port.id);
    layers?.circle.setStyle({
      color: index === currentPortIndex ? "#76f7d1" : index < currentPortIndex ? "#58b8a4" : "#799298",
      radius: index === currentPortIndex ? 4.5 : 3.5
    });
  });
  updateFutureRoute();
}

function updateFutureRoute() {
  if (!shipPosition) {
    futureLine.setLatLngs(fullRoute);
    return;
  }
  const nextIndex = shipAtPort ? currentPortIndex + 1 : currentPortIndex;
  if (nextIndex >= ports.length) {
    futureLine.setLatLngs([]);
    return;
  }
  if (nextIndex === 0) {
    futureLine.setLatLngs([shipPosition, ...fullRoute]);
    return;
  }
  const route = [shipPosition];
  for (let i = nextIndex - 1; i < ports.length - 1; i += 1) {
    const key = `${ports[i].id}-${ports[i + 1].id}`;
    route.push(...(legWaypoints[key] || []), portLatLng(ports[i + 1]));
  }
  futureLine.setLatLngs(route);
}

function createShipMarker(position, heading = 0) {
  const icon = L.divIcon({
    className: "ship-marker",
    html: `<div class="ship-marker-wrap"><span class="ship-pulse"></span><span class="ship-core"><span class="ship-direction" id="ship-direction"><svg viewBox="0 0 24 24"><path d="M12 2 19 21 12 17 5 21Z"/></svg></span></span><span class="ship-caption">OOCL HK · 040E</span></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
  shipMarker = L.marker(position, { icon, keyboard: false, zIndexOffset: 1000 }).addTo(map);
  setShipHeading(heading);
}

function setShipHeading(heading) {
  const direction = document.getElementById("ship-direction");
  if (direction && Number.isFinite(heading)) direction.style.transform = `rotate(${heading}deg)`;
}

function normalizePosition(feature, cached = false) {
  if (!feature?.geometry?.coordinates) return;
  const [lon, lat] = feature.geometry.coordinates;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  const incoming = feature.properties || {};
  const definedValues = Object.fromEntries(Object.entries(incoming).filter(([, value]) => value !== undefined && value !== null));
  const props = { ...vesselState, ...definedValues };
  vesselState = props;
  const seen = props.seen || props.rxtime || props.time || new Date().toISOString();
  if (shipSeen && new Date(seen) < shipSeen) return;

  shipPosition = [lat, lon];
  shipSeen = new Date(seen);
  const heading = Number.isFinite(props.heading) ? props.heading : Number(props.cog) || 0;
  if (!shipMarker) createShipMarker(shipPosition, heading);
  else {
    shipMarker.setLatLng(shipPosition);
    setShipHeading(heading);
  }

  if (!actualCoordinates.length) {
    actualCoordinates = [shipPosition];
    actualSegments = [actualCoordinates];
  } else {
    const last = actualCoordinates[actualCoordinates.length - 1];
    if (map.distance(last, shipPosition) > 20) actualCoordinates.push(shipPosition);
    else actualCoordinates[actualCoordinates.length - 1] = shipPosition;
  }
  actualLine.setLatLngs(actualSegments);

  updatePositionPanel(props, cached);
  updatePortStates();
  updateFreshness();
  if (following) map.panTo(shipPosition, { animate: true, duration: 0.8 });
}

function updatePositionPanel(props, cached) {
  const positionName = currentPositionName(props.near);
  document.getElementById("position-name").textContent = positionName;
  const [lat, lon] = shipPosition;
  document.getElementById("coordinates").innerHTML = `${formatCoordinate(lat, "N", "S")}&nbsp;&nbsp;${formatCoordinate(lon, "E", "W")}`;
  document.getElementById("ship-speed").textContent = Number.isFinite(Number(props.sog)) ? Number(props.sog).toFixed(1) : "—";
  document.getElementById("ship-course").textContent = Number.isFinite(Number(props.cog)) ? Math.round(Number(props.cog)) : "—";
  document.getElementById("ship-draught").textContent = Number.isFinite(Number(props.draught)) ? Number(props.draught).toFixed(1) : "—";
  document.getElementById("nav-state").textContent = cached ? "缓存船位" : (navStates[props.nav_status] || "AIS 已更新");
}

function currentPositionName(near) {
  if (near?.includes("Valencia")) return "瓦伦西亚 · 西班牙";
  if (near?.includes("Genoa")) return "热那亚 · 意大利";
  if (near?.includes("Piraeus")) return "比雷埃夫斯 · 希腊";
  if (near?.includes("Singapore")) return "新加坡";
  if (near?.includes("Shanghai")) return "上海 · 中国";
  return near || "040E 航线上";
}

function formatCoordinate(value, positive, negative) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positive : negative}`;
}

function updateFreshness() {
  if (!shipSeen || Number.isNaN(shipSeen.getTime())) return;
  const minutes = Math.max(0, Math.floor((Date.now() - shipSeen.getTime()) / 60000));
  const relative = minutes < 1 ? "刚刚更新" : minutes < 60 ? `${minutes} 分钟前更新` : `${Math.floor(minutes / 60)} 小时前更新`;
  const exact = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false }).format(shipSeen);
  document.getElementById("position-updated").textContent = `${relative} · 北京时间 ${exact}`;
}

function fitFullRoute() {
  const padding = window.innerWidth < 600 ? [35, 35] : [60, 60];
  map.fitBounds(L.latLngBounds(fullRoute), { padding, maxZoom: 4, animate: false });
}

function focusPort(index) {
  const port = ports[index];
  following = false;
  updateFollowButton();
  map.setView(portLatLng(port), 6, { animate: false });
}

function focusShip() {
  if (!shipPosition) {
    showToast("暂未获得 AIS 船位，请稍后重试");
    return;
  }
  map.setView(shipPosition, 6, { animate: false });
}

function updateFollowButton() {
  const button = document.getElementById("follow-button");
  button.setAttribute("aria-pressed", String(following));
  button.lastChild.textContent = following ? " 跟随中" : " 跟随船舶";
}

function setConnection(state, text) {
  const pill = document.getElementById("connection-pill");
  pill.classList.remove("is-live", "is-connecting", "is-offline");
  pill.classList.add(`is-${state}`);
  document.getElementById("connection-label").textContent = text;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4500);
}

async function fetchLatestPosition() {
  try {
    const response = await fetch(`${AIS_API}/vessels/${MMSI}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`AIS ${response.status}`);
    const feature = await response.json();
    normalizePosition(feature);
  } catch (error) {
    normalizePosition(lastKnown, true);
    setConnection("offline", "AIS 暂时不可用");
    showToast("实时接口暂时不可用，正在显示标注时间的缓存船位");
  }
}

function aisGapBridge(from, to) {
  if (from && to && from[0] < 39 && to[0] > 41 && from[1] > 10 && to[1] < 7) {
    return [[38.1, 10.3], [38.5, 8], [39.7, 6.7], [41.2, 5.9]];
  }
  return [];
}

async function fetchTrack() {
  try {
    const params = new URLSearchParams({ from: VOYAGE_START, to: new Date().toISOString(), limit: "1000" });
    const response = await fetch(`${AIS_API}/vessels/${MMSI}/track?${params}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Track ${response.status}`);
    const track = await response.json();
    if (track.geometry?.type === "LineString") {
      const coordinates = track.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      const breaks = track.properties.breaks || [];
      const trackSegments = [];
      let start = 0;
      for (const end of breaks) {
        if (end > start) trackSegments.push(coordinates.slice(start, end));
        start = end;
      }
      if (start < coordinates.length) trackSegments.push(coordinates.slice(start));
      actualCoordinates = trackSegments.shift() || [];
      for (const segment of trackSegments) {
        actualCoordinates.push(...aisGapBridge(actualCoordinates.at(-1), segment[0]), ...segment);
      }
      actualSegments = [actualCoordinates];
      if (shipPosition && actualCoordinates.length && map.distance(actualCoordinates.at(-1), shipPosition) > 20) actualCoordinates.push(shipPosition);
      actualLine.setLatLngs(actualCoordinates);
    }
  } catch (error) {
    showToast("历史 AIS 轨迹暂未载入，实线将在收到轨迹后显示");
  }
}

function normalizeStreamEvent(event) {
  const payload = event.data || event.vessel || event;
  const props = payload.properties || event.properties || payload;
  const mmsi = Number(props.mmsi || props.user_id || props.UserID || event.mmsi);
  if (mmsi !== MMSI) return null;
  let coordinates = payload.geometry?.coordinates;
  if (!coordinates) {
    const lat = Number(props.latitude ?? props.lat ?? props.Latitude);
    const lon = Number(props.longitude ?? props.lon ?? props.Longitude);
    if (Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) coordinates = [lon, lat];
  }
  if (!coordinates) return null;
  return {
    geometry: { coordinates },
    properties: {
      ...props,
      seen: props.seen || props.rxtime || event.rxtime || event.time || new Date().toISOString(),
      cog: props.cog ?? props.Cog,
      sog: props.sog ?? props.Sog,
      heading: props.heading ?? props.heading_true ?? props.TrueHeading,
      nav_status: props.nav_status ?? props.NavigationalStatus
    }
  };
}

function connectStream() {
  clearTimeout(reconnectTimer);
  if (!("WebSocket" in window)) {
    setConnection("offline", "浏览器不支持实时连接");
    return;
  }
  setConnection("connecting", "连接 AIS 中");
  socket = new WebSocket("wss://ais.openwaters.io/v1/stream");
  socket.addEventListener("open", () => {
    reconnectAttempts = 0;
    socket.send(JSON.stringify({ type: "subscribe", mmsi: [MMSI], snapshot: true }));
    setConnection("live", "AIS 实时连接");
  });
  socket.addEventListener("message", (message) => {
    try {
      const event = JSON.parse(message.data);
      if (event.type === "error") {
        setConnection("offline", "AIS 订阅异常");
        return;
      }
      const feature = normalizeStreamEvent(event);
      if (feature) normalizePosition(feature);
    } catch (error) {
      console.warn("Ignored malformed AIS event", error);
    }
  });
  socket.addEventListener("close", scheduleReconnect);
  socket.addEventListener("error", () => setConnection("offline", "AIS 连接中断"));
}

function scheduleReconnect() {
  if (document.hidden) return;
  setConnection("offline", "AIS 等待重连");
  const delay = Math.min(30000, 2000 * 2 ** reconnectAttempts) + Math.random() * 1000;
  reconnectAttempts += 1;
  clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(connectStream, delay);
}

function updateEta() {
  const now = new Date();
  const elapsed = now - new Date(VOYAGE_START);
  const duration = SHANGHAI_ETA - new Date(VOYAGE_START);
  const progress = Math.max(4, Math.min(100, (elapsed / duration) * 100));
  document.getElementById("eta-progress-bar").style.width = `${progress}%`;
  const days = Math.ceil((SHANGHAI_ETA - now) / 86400000);
  document.getElementById("eta-note").textContent = days > 0 ? `承运人计划 ETA · 距计划日期约 ${days} 天` : "承运人计划 ETA · 请留意最新船期";
}

function bindEvents() {
  document.getElementById("locate-button").addEventListener("click", focusShip);
  document.getElementById("route-button").addEventListener("click", fitFullRoute);
  document.getElementById("follow-button").addEventListener("click", () => {
    following = !following;
    updateFollowButton();
    if (following) focusShip();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (!socket || socket.readyState === WebSocket.CLOSED)) connectStream();
  });
  window.addEventListener("beforeunload", () => socket?.close());
}

function startClock() {
  const update = () => {
    const time = new Date().toISOString().slice(11, 19);
    document.getElementById("utc-clock").textContent = `UTC ${time}`;
  };
  update();
  setInterval(update, 1000);
}

async function init() {
  buildTimeline();
  initMap();
  updatePortStates();
  bindEvents();
  startClock();
  updateEta();
  normalizePosition(lastKnown, true);
  await Promise.allSettled([fetchLatestPosition(), fetchTrack()]);
  document.getElementById("map-loading").classList.add("is-hidden");
  setTimeout(() => document.getElementById("map-loading").remove(), 400);
  connectStream();
  setInterval(updateFreshness, 30000);
}

init().catch((error) => {
  console.error(error);
  document.getElementById("map-loading").textContent = `载入失败：${error.message}`;
});
