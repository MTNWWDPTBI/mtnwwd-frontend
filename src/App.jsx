import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldAlert, BarChart3, Settings, 
  CheckCircle, Clock, AlertTriangle, ChevronRight, 
  Search, Bell, Users, Cpu, ArrowUpRight, 
  Wrench, Package, Camera, LogOut, Power, User, ShieldCheck,
  ClipboardList, PenTool, PlusCircle, Play, X, Check, Download, 
  MessageSquare, Database, Box, Layers, Calendar, MapPin, Save, History
} from 'lucide-react';

// URL BACKEND KITA (Jika sudah di-hosting, ganti localhost dengan URL Hosting Backend)
// Menjadi ini:
const API_URL = 'http://127.0.0.1:8000/api';

const MASTER_PSA = {
  'SHX G3': [
    { id: 'shx3_vib_collector', name: 'Vibration Damper (Collector)', min: 1, max: 6 },
    { id: 'shx3_baut_sh_biasa', name: 'Baut Set SH Biasa', min: 1, max: 6 },
    { id: 'shx3_baut_sh_panjang', name: 'Baut Set SH Panjang', min: 1, max: 6 },
    { id: 'shx3_sponge', name: 'Sponge', min: 1, max: 6 },
    { id: 'shx3_pulley_setelah', name: 'Pulley Setelah HD SHX', min: 1, max: 6 },
    { id: 'shx3_pulley_sebelum', name: 'Pulley Sebelum HD SHX', min: 1, max: 6 },
    { id: 'shx3_pulley_kapstan', name: 'Pulley Kapstan 3&4', min: 2, max: 6 },
    { id: 'shx3_straightener', name: 'Straightener Roller SHX', min: 5, max: 6 },
    { id: 'shx3_point_maker', name: 'Point Maker (Pointing Device)', min: 2, max: 10 },
    { id: 'shx3_vib_cw', name: 'Vibration Damper (Counter Weight)', min: 3, max: 10 },
    { id: 'shx3_head_dies', name: 'Head Dies Bolt (Nut)', min: 2, max: 12 },
    { id: 'shx3_hand_wheel', name: 'Hand Wheel', min: 3, max: 12 },
    { id: 'shx3_ind_merah', name: 'Indikator Lampu Merah', min: 3, max: 6 },
    { id: 'shx3_ind_biru', name: 'Indikator Lampu Biru', min: 3, max: 6 },
    { id: 'shx3_pompa_stock', name: 'Pompa Oiling (Stock)', min: 2, max: 15 },
    { id: 'shx3_pompa_ex', name: 'Pompa Oiling (Ex CO)', min: 0, max: 15 }
  ],
  'NDB G1': [
    { id: 'ndb1_kapstan_23', name: 'Pulley Kapstan 2 & 3', min: 2, max: 10 },
    { id: 'ndb1_pulley_dancer', name: 'Pulley Dancer', min: 1, max: 4 },
    { id: 'ndb1_pulley_hd', name: 'Pulley HD', min: 3, max: 6 },
    { id: 'ndb1_spring_flyer', name: 'Spring Flyer NDB', min: 1, max: 7 },
    { id: 'ndb1_pulley_int2', name: 'Pulley Interence 2', min: 2, max: 4 },
    { id: 'ndb1_head_dies_nut', name: 'Head Dies Nut', min: 3, max: 12 },
    { id: 'ndb1_pulley_sebelum', name: 'Pulley Sebelum HD', min: 1, max: 6 },
    { id: 'ndb1_pulley_setelah', name: 'Pulley Setelah HD*', min: 1, max: 6 },
    { id: 'ndb1_point_marker', name: 'Point Marker (Pointing Device)', min: 2, max: 10 },
    { id: 'ndb1_vib_bulat', name: 'Vibration Damper (Bulat)', min: 3, max: 10 },
    { id: 'ndb1_pulley_kapstan1', name: 'Pulley Kapstan 1', min: 2, max: 6 },
    { id: 'ndb1_ring_pin', name: 'Ring Pin ONO', min: 2, max: 8 },
    { id: 'ndb1_lock_isc', name: 'Lock ISC', min: 1, max: 8 },
    { id: 'ndb1_brake_ono', name: 'Brake Band ONO (ANA)*', min: 3, max: 15 },
    { id: 'ndb1_pulley_trans', name: 'Pulley Transversing (double)*', min: 1, max: 3 },
    { id: 'ndb1_brake_triton', name: 'Brake Band Triton (ANM)*', min: 5, max: 20 }
  ],
  'NDE G1': [
    { id: 'nde1_kapstan_23', name: 'Pulley Kapstan 2 & 3', min: 2, max: 10 },
    { id: 'nde1_pulley_sebelum', name: 'Pulley Sebelum HD', min: 2, max: 8 },
    { id: 'nde1_straightener', name: 'Straightener Roller 6 (15x47x11)', min: 5, max: 15 },
    { id: 'nde1_pulley_level', name: 'Pulley Level Wind', min: 2, max: 8 },
    { id: 'nde1_point_marker', name: 'Point Marker (Pointing Device)', min: 2, max: 10 },
    { id: 'nde1_vib_cw', name: 'Vibration Damper (Counter Weight)', min: 3, max: 10 },
    { id: 'nde1_head_die_bolt', name: 'Head Die Bolt (NUT)', min: 2, max: 12 },
    { id: 'nde1_baut_hd', name: 'Baut HD (Hand Wheel)', min: 3, max: 12 },
    { id: 'nde1_sponge', name: 'Sponge', min: 1, max: 6 },
    { id: 'nde1_ind_merah', name: 'Indikator Lampu Merah', min: 1, max: 6 },
    { id: 'nde1_ind_biru', name: 'Indikator Lampu Biru', min: 1, max: 6 },
    { id: 'nde1_vib_col', name: 'Vibration Damper (Collector)', min: 1, max: 6 },
    { id: 'nde1_baut_panjang', name: 'Baut Set SH Panjang', min: 1, max: 6 },
    { id: 'nde1_baut_biasa', name: 'Baut Set SH Biasa', min: 1, max: 6 }
  ],
  'SE G1': [
    { id: 'se1_kapstan_23', name: 'Pulley Kapstan 2 & 3', min: 2, max: 10 },
    { id: 'se1_pulley_sebelum', name: 'Pulley Sebelum HD', min: 1, max: 6 },
    { id: 'se1_straightener', name: 'Straightener Roller 6 (15x47x11)', min: 5, max: 15 },
    { id: 'se1_sponge', name: 'Sponge', min: 1, max: 6 },
    { id: 'se1_point_marker', name: 'Point Marker (Pointing Device)', min: 3, max: 6 },
    { id: 'se1_head_die_bolt', name: 'Head Die Bolt (NUT)', min: 2, max: 12 },
    { id: 'se1_vib_cw', name: 'Vibration Damper (Counter Weight)', min: 3, max: 10 },
    { id: 'se1_baut_hd', name: 'Baut HD (Hand Wheel)', min: 3, max: 12 },
    { id: 'se1_baut_panjang', name: 'Baut Set SH Panjang', min: 1, max: 6 },
    { id: 'se1_baut_biasa', name: 'Baut Set SH Biasa', min: 1, max: 6 },
    { id: 'se1_vib_col', name: 'Vibration Damper (Collector)', min: 2, max: 10 },
    { id: 'se1_ind_merah', name: 'Indikator Lampu Merah', min: 1, max: 6 },
    { id: 'se1_ind_biru', name: 'Indikator Lampu Biru', min: 1, max: 6 }
  ],
  'SHX G7': [
    { id: 'shx7_pulley_sebelum', name: 'Pulley Sebelum HD SHX', min: 1, max: 6 },
    { id: 'shx7_pulley_setelah', name: 'Pulley Setelah HD SHX', min: 1, max: 6 },
    { id: 'shx7_pulley_kapstan', name: 'Pulley Kapstan 3&4', min: 2, max: 6 },
    { id: 'shx7_straightener', name: 'Straightener Roller SHX', min: 5, max: 6 },
    { id: 'shx7_vib_col', name: 'Vibration Damper (Collector)', min: 1, max: 6 },
    { id: 'shx7_hand_wheel', name: 'Hand Wheel', min: 3, max: 12 },
    { id: 'shx7_head_dies', name: 'Head Dies Bolt (Nut)', min: 2, max: 12 },
    { id: 'shx7_vib_cw', name: 'Vibration Damper (Counter Weight)', min: 3, max: 10 },
    { id: 'shx7_sponge', name: 'Sponge', min: 1, max: 6 },
    { id: 'shx7_baut_biasa', name: 'Baut Set SH Biasa', min: 1, max: 6 },
    { id: 'shx7_baut_panjang', name: 'Baut Set SH Panjang', min: 1, max: 6 },
    { id: 'shx7_point_maker', name: 'Point Maker (Pointing Device)', min: 2, max: 10 },
    { id: 'shx7_ind_merah', name: 'Indikator Lampu Merah', min: 1, max: 6 },
    { id: 'shx7_ind_biru', name: 'Indikator Lampu Biru', min: 1, max: 6 }
  ],
  'NDE G3': [
    { id: 'nde3_kapstan_23', name: 'Pulley Kapstan 2 & 3', min: 2, max: 10 },
    { id: 'nde3_pulley_sebelum', name: 'Pulley Sebelum HD', min: 2, max: 8 },
    { id: 'nde3_straightener', name: 'Straightener Roller 6 (15x47x11)', min: 5, max: 15 },
    { id: 'nde3_pulley_level', name: 'Pulley Level Wind', min: 2, max: 8 },
    { id: 'nde3_sponge', name: 'Sponge', min: 1, max: 6 },
    { id: 'nde3_baut_biasa', name: 'Baut Set SH Biasa', min: 1, max: 6 },
    { id: 'nde3_baut_panjang', name: 'Baut Set SH Panjang', min: 1, max: 6 },
    { id: 'nde3_point_maker', name: 'Point Maker (Pointing Device)', min: 2, max: 6 },
    { id: 'nde3_vib_col', name: 'Vibration Damper (Collector)', min: 2, max: 10 },
    { id: 'nde3_head_dies', name: 'Head Dies Bolt (Nut)', min: 2, max: 12 },
    { id: 'nde3_vib_cw', name: 'Vibration Damper (Counter Weight)', min: 1, max: 6 },
    { id: 'nde3_hand_wheel', name: 'Hand Wheel', min: 3, max: 12 },
    { id: 'nde3_ind_merah', name: 'Indikator Lampu Merah', min: 1, max: 6 },
    { id: 'nde3_ind_biru', name: 'Indikator Lampu Biru', min: 1, max: 6 }
  ]
};

export default function UnifiedNexusApp() {
  const [view, setView] = useState('login'); 
  const [currentUser, setCurrentUser] = useState('');
  const [userName, setUserName] = useState(''); 
  const [userTeam, setUserTeam] = useState(''); 
  const [loginError, setLoginError] = useState(''); 
  
  const VALID_TECHNICIANS = {
    '110134': { name: 'Arip AG', team: 'Tim Shift D' },
    '170119': { name: 'Bagus', team: 'Tim Non Shift' },
    '100128': { name: 'Dyan Nopri', team: 'Tim Shift B' },
    '110406': { name: 'Moh Syaouqi', team: 'Tim Shift A' },
    '140341': { name: 'Mujiono', team: 'Tim Non Shift' },
    '140403': { name: 'Makhlufi', team: 'Tim Shift C' },
    '100147': { name: 'Suharno', team: 'Tim Non Shift' },
    '260691': { name: 'Rizki N', team: 'Tim Non Shift' },
    '260894': { name: 'Azi Tyas', team: 'Tim Non Shift' }
  };

  const VALID_SPV = {
    '110915': 'Dony Mulyana'
  };

  const [workOrders, setWorkOrders] = useState([]);
  const [inventory, setInventory] = useState([]); 
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [dbStatus, setDbStatus] = useState('Checking...');

  // MENGAMBIL DATA DARI MYSQL API (Polling setiap 5 detik agar Real-time)
  const fetchAllData = async () => {
    try {
      const [resWO, resInv, resHist] = await Promise.all([
        fetch(`${API_URL}/workorders`),
        fetch(`${API_URL}/inventory`),
        fetch(`${API_URL}/inventory/history`)
      ]);
      
      if(resWO.ok) setWorkOrders(await resWO.json());
      if(resInv.ok) setInventory(await resInv.json());
      if(resHist.ok) setInventoryHistory(await resHist.json());
      setDbStatus('Connected 🟢 (MySQL)');
    } catch (err) {
      setDbStatus('Connection Error 🔴');
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 5000); // Polling pengganti Firebase Realtime
    return () => clearInterval(interval);
  }, []);

  const addWorkOrder = async (data) => {
    const newWO = { ...data, spvApproved: false, spvNote: '' };
    try {
      await fetch(`${API_URL}/workorders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWO)
      });
      fetchAllData(); // Refresh data langsung
    } catch (err) { console.error("Gagal simpan WO:", err); }
  };

  const updateWorkOrder = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/workorders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      fetchAllData();
    } catch (err) { console.error("Gagal update WO:", err); }
  };

  const approveBypass = async (id) => { updateWorkOrder(id, { spvApproved: true, status: 'Pending' }); };
  const addSpvNote = async (id, note) => { updateWorkOrder(id, { spvNote: note }); };

  const saveInventoryBatch = async (itemsArray, location, date, name, team) => {
    const payload = itemsArray.map(item => ({
       docId: `${location.replace(/\s+/g, '_')}_${item.id}`,
       id: item.id, name: item.name, min: item.min, max: item.max,
       tambahStock: item.tambahStock, totalStock: item.totalStock,
       location, date, updatedBy: name, team
    }));

    try {
      await fetch(`${API_URL}/inventory/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload })
      });
      fetchAllData();
    } catch (err) { console.error("Gagal simpan stok:", err); }
  };

  const handleTechLogin = () => {
    if (VALID_TECHNICIANS[currentUser]) {
      setUserName(VALID_TECHNICIANS[currentUser].name);
      setUserTeam(VALID_TECHNICIANS[currentUser].team); 
      setLoginError(''); setView('tech');
    } else { setLoginError('Akses Ditolak: NIK tidak terdaftar sebagai Teknisi.'); }
  };

  const handleSpvLogin = () => {
    if (VALID_SPV[currentUser]) {
      setUserName(VALID_SPV[currentUser]);
      setLoginError(''); setView('spv');
    } else { setLoginError('Akses Ditolak: NIK tidak terdaftar sebagai Supervisor.'); }
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans selection:bg-cyan-500/30 relative">
        <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 flex items-center gap-2 shadow-lg">
           <div className={`w-2 h-2 rounded-full ${dbStatus.includes('🟢') ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
           <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{dbStatus}</span>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl w-full max-w-md z-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="flex flex-col items-center mb-8">
            <Cpu className="w-12 h-12 text-cyan-400 mb-3" />
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest text-center leading-tight">WWD<br/>MAINTENANCE</h1>
            <p className="text-slate-400 text-xs tracking-widest uppercase mt-3 font-semibold">Bekaert Indonesia</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><User className="w-4 h-4" /> Identitas (NIK)</label>
              <input type="text" value={currentUser} onChange={(e) => { setCurrentUser(e.target.value); setLoginError(''); }} placeholder="Masukkan NIK..." className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 px-4 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-center tracking-widest" />
            </div>
            <div className="pt-2 space-y-3">
              {loginError && <div className="bg-red-950/40 border border-red-500/50 text-red-300 text-xs py-3 px-3 rounded-lg text-center font-bold flex items-center justify-center gap-2"><ShieldAlert className="w-4 h-4" /> {loginError}</div>}
              <button onClick={handleTechLogin} className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-slate-800 text-cyan-400 border border-cyan-500/50 hover:bg-slate-700 active:scale-95"><Wrench className="w-5 h-5" /> Masuk Teknisi</button>
              <button onClick={handleSpvLogin} className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-cyan-700 text-white hover:bg-cyan-600 border border-cyan-500 active:scale-95"><ShieldCheck className="w-5 h-5" /> Akses Supervisor</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {view === 'tech' && <TechPortal nik={currentUser} userName={userName} userTeam={userTeam} workOrders={workOrders} inventory={inventory} inventoryHistory={inventoryHistory} addWorkOrder={addWorkOrder} updateWorkOrder={updateWorkOrder} saveInventoryBatch={saveInventoryBatch} handleLogout={() => { setView('login'); setCurrentUser(''); }} />}
      {view === 'spv' && <SpvPortal userName={userName} workOrders={workOrders} approveBypass={approveBypass} addSpvNote={addSpvNote} handleLogout={() => { setView('login'); setCurrentUser(''); }} />}
    </>
  );
}

// ==========================================
// PORTAL TEKNISI
// ==========================================
function TechPortal({ nik, userName, userTeam, workOrders, inventory, inventoryHistory, addWorkOrder, updateWorkOrder, saveInventoryBatch, handleLogout }) {
  const [activeTab, setActiveTab] = useState('logbook'); 
  const [selectedWO, setSelectedWO] = useState(null); 
  const [actionNotes, setActionNotes] = useState('');
  const [newStatus, setNewStatus] = useState('Tuntas');
  const [isSaving, setIsSaving] = useState(false);
  
  const [shiftWaktu, setShiftWaktu] = useState('1'); 
  const [machineId, setMachineId] = useState('');
  const [problemDesc, setProblemDesc] = useState('');
  const [status, setStatus] = useState('Tuntas');
  const [pendingAction, setPendingAction] = useState('');
  const [waitingPartName, setWaitingPartName] = useState('');
  const [isBypass, setIsBypass] = useState(false);
  const [bypassReason, setBypassReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [psaDate, setPsaDate] = useState(new Date().toISOString().slice(0, 10));
  const [psaLocation, setPsaLocation] = useState(Object.keys(MASTER_PSA)[0]);
  const [psaData, setPsaData] = useState({});
  const [tpmLocation, setTpmLocation] = useState(Object.keys(MASTER_PSA)[0]);
  const [showPsaSuccess, setShowPsaSuccess] = useState(false);

  const criticalTasks = workOrders.filter(t => t.isBypass === true && t.spvApproved === false);
  const pendingTasks = workOrders.filter(t => (t.status === 'Pending' && t.isBypass === false) || (t.isBypass === true && t.spvApproved === true && t.status !== 'Tuntas'));
  const waitingParts = workOrders.filter(t => t.status === 'Waiting Part' && t.isBypass === false);

  const handleFormSubmit = async () => {
    setIsSaving(true);
    const newWoData = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(), 
      machine: machineId || 'Aset Tidak Diketahui', issue: problemDesc || 'Tidak ada deskripsi',
      status: status, action: pendingAction, part: waitingPartName,
      isBypass: isBypass, bypassReason: bypassReason,
      reqBy: userName, nik: nik, team: userTeam, shiftWaktu: shiftWaktu 
    };

    await addWorkOrder(newWoData);

    // KODE API TELEGRAM OTOMATIS (Kembali ke Telegram)
    let tgText = `🚨 *[SHIFT HANDOVER WWD]* 🚨\n\n`;
    tgText += `🕒 *Shift Kerja:* Shift ${newWoData.shiftWaktu}\n`;
    tgText += `👥 *Tim:* ${newWoData.team}\n`;
    tgText += `⚙️ *Mesin:* ${newWoData.machine}\n`;
    tgText += `📋 *Status:* ${newWoData.status}\n`;
    tgText += `🛠️ *Kendala:* ${newWoData.issue}\n\n`;
    if (newWoData.status === 'Pending') tgText += `➡️ *Lanjutan:* ${newWoData.action}\n`;
    if (newWoData.status === 'Waiting Part') tgText += `📦 *Butuh Part:* ${newWoData.part}\n`;
    if (newWoData.isBypass) tgText += `⚠ *STATUS BYPASS AKTIF* ⚠️\nAlasan: ${newWoData.bypassReason}\n\n`;
    tgText += `👷 _Dilaporkan oleh: ${newWoData.reqBy}_`;
    
    const CORRECT_CHAT_ID = '-5389639720'; 
    const TELEGRAM_BOT_TOKEN = '8725079859:AAHJm5x3Ta488kO7-nzP0UpePs7yCFWUGiA'; 
    
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CORRECT_CHAT_ID, text: tgText, parse_mode: 'Markdown' })
    }).catch(err => console.log("Telegram API fail", err));
    
    setIsSaving(false); setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false); setMachineId(''); setProblemDesc(''); setStatus('Tuntas');
      setPendingAction(''); setWaitingPartName(''); setIsBypass(false); setBypassReason('');
      setActiveTab('dashboard'); 
    }, 1200);
  };

  const handlePsaInputChange = (partId, field, value) => { setPsaData(prev => ({ ...prev, [partId]: { ...prev[partId], [field]: value } })); };

  const handlePsaSubmit = async () => {
    const itemsToSave = [];
    (MASTER_PSA[psaLocation] || []).forEach(part => {
      const data = psaData[part.id];
      if (data && (data.tambah || data.total)) itemsToSave.push({ id: part.id, name: part.name, min: part.min, max: part.max, tambahStock: data.tambah || '', totalStock: data.total || 0 });
    });

    if (itemsToSave.length > 0) {
      await saveInventoryBatch(itemsToSave, psaLocation, psaDate, userName, userTeam);
      setShowPsaSuccess(true);
      setTimeout(() => { setShowPsaSuccess(false); setPsaData({}); setTpmLocation(psaLocation); setActiveTab('tpm'); }, 1500);
    } else { alert("Harap isi minimal satu data stok."); }
  };

  const handleExecuteAction = async () => {
    if (!selectedWO) return;
    await updateWorkOrder(selectedWO.id, {
      status: newStatus,
      action: newStatus === 'Pending' ? actionNotes : selectedWO.action,
      resolutionNote: newStatus === 'Tuntas' ? actionNotes : '',
      resolvedBy: `${userName} (Shift ${shiftWaktu})` 
    });
    setSelectedWO(null);
  };

  const handleExportHistory = () => {
    const headers = ['Waktu Update', 'Lokasi Mesin', 'Nama Part', 'Tambah Stock', 'Total Stock', 'Disupply Oleh', 'Tim Shift'];
    const csvRows = inventoryHistory.map(h => `"${new Date(h.timestamp).toLocaleString('id-ID')}","${h.location}","${h.part_name || h.partName}","${h.tambah_stock || h.tambahStock}","${h.total_stock || h.totalStock}","${h.user}","${h.team}"`);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([[headers.join(','), ...csvRows].join('\n')], { type: 'text/csv;charset=utf-8;' }));
    link.setAttribute('download', `History_PSA_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-24 overflow-x-hidden">
      
      {selectedWO && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h3 className="font-bold text-white uppercase flex items-center gap-2"><Play className="w-4 h-4 text-cyan-400" /> Eksekusi Pekerjaan</h3>
              <button onClick={() => setSelectedWO(null)} className="text-slate-400 hover:text-white p-1"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <div className="font-bold text-slate-200">{selectedWO.machine}</div>
                <div className="text-sm text-slate-400 mb-2">{selectedWO.issue}</div>
                {selectedWO.spvNote && <div className="text-xs text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-900"><span className="font-bold">Instruksi SPV:</span> {selectedWO.spvNote}</div>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setNewStatus('Tuntas')} className={`py-2 rounded-lg text-sm font-bold border ${newStatus === 'Tuntas' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Tuntas</button>
                <button onClick={() => setNewStatus('Pending')} className={`py-2 rounded-lg text-sm font-bold border ${newStatus === 'Pending' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Masih Pending</button>
              </div>
              <textarea value={actionNotes} onChange={(e) => setActionNotes(e.target.value)} placeholder="Catatan eksekusi Anda..." className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:border-cyan-500 h-24 text-slate-200"></textarea>
              <button onClick={handleExecuteAction} className="w-full py-3 bg-cyan-600 text-white rounded-xl font-bold uppercase flex justify-center gap-2 active:scale-95"><CheckCircle className="w-5 h-5" /> Simpan Update</button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase">
            {activeTab === 'logbook' ? 'Form Handover' : activeTab === 'dashboard' ? 'Shift Dashboard' : activeTab === 'psa' ? 'Input Data PSA' : 'TPM Board (Stock)'}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1"><User className="w-3 h-3 text-cyan-500" /> Teknisi: <span className="font-bold text-slate-200">{userName}</span></div>
        </div>
        <button onClick={handleLogout} className="p-2 bg-slate-900 rounded-full border border-slate-700 text-slate-400 hover:text-red-400"><Power className="w-4 h-4" /></button>
      </header>

      <main className="p-4 max-w-lg mx-auto space-y-4">
        {activeTab === 'logbook' && (
          <>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3"><div className="p-2.5 bg-cyan-950/50 text-cyan-400 rounded-lg"><Users className="w-5 h-5" /></div><div><div className="text-[10px] text-slate-500 uppercase font-bold">Tim Shift Anda</div><div className="font-bold text-slate-200">{userTeam}</div></div></div>
              <div className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-950 text-emerald-500 border border-slate-800 rounded-md"><Check className="w-3 h-3 inline mr-1" />Verifikasi</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
               <h2 className="text-sm font-semibold uppercase mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-cyan-400"/> Waktu Shift</h2>
               <div className="grid grid-cols-3 gap-2">{['1', '2', '3'].map(s => <button key={s} onClick={() => setShiftWaktu(s)} className={`py-2 rounded-lg text-xs font-bold border ${shiftWaktu === s ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Shift {s}</button>)}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h2 className="text-sm font-semibold uppercase mb-3 flex items-center gap-2"><Cpu className="w-5 h-5 text-cyan-400"/> Data Mesin</h2>
              <input type="text" value={machineId} onChange={(e) => setMachineId(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-3 text-sm focus:border-cyan-500 text-slate-200 mb-3" placeholder="Nama Mesin"/>
              <textarea value={problemDesc} onChange={(e) => setProblemDesc(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-3 text-sm focus:border-cyan-500 h-24 text-slate-200" placeholder="Deskripsi..."></textarea>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
               <h2 className="text-sm font-semibold uppercase mb-3 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-cyan-400"/> Status</h2>
               <div className="grid grid-cols-3 gap-2 mb-3">{['Tuntas', 'Pending', 'Waiting Part'].map(s => <button key={s} onClick={() => setStatus(s)} className={`py-2 rounded-lg text-xs font-bold border ${status === s ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>{s}</button>)}</div>
               {status === 'Pending' && <textarea value={pendingAction} onChange={(e) => setPendingAction(e.target.value)} className="w-full bg-slate-950 border border-amber-500/50 rounded-lg py-2 px-3 text-sm focus:border-amber-500 text-slate-200" placeholder="Tindakan Shift Berikutnya..."></textarea>}
               {status === 'Waiting Part' && <input type="text" value={waitingPartName} onChange={(e) => setWaitingPartName(e.target.value)} className="w-full bg-slate-950 border border-cyan-500/50 rounded-lg py-3 px-3 text-sm focus:border-cyan-500 text-slate-200" placeholder="Nama Sparepart"/>}
            </div>
            <div className={`border rounded-xl p-4 ${isBypass ? 'bg-red-950/30 border-red-500/50' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsBypass(!isBypass)}>
                <div className="flex items-center gap-2"><ShieldAlert className={`w-5 h-5 ${isBypass ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} /><div><h2 className={`text-sm font-bold uppercase ${isBypass ? 'text-red-400' : 'text-slate-300'}`}>Bypass Pengaman</h2></div></div>
                <div className={`w-12 h-6 rounded-full p-1 ${isBypass ? 'bg-red-500' : 'bg-slate-700'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${isBypass ? 'translate-x-6' : 'translate-x-0'}`}></div></div>
              </div>
              {isBypass && <textarea value={bypassReason} onChange={(e) => setBypassReason(e.target.value)} className="w-full mt-3 bg-slate-950 border border-red-500/50 text-red-100 rounded-lg py-2 px-3 text-sm focus:border-red-500" placeholder="Alasan bypass..."></textarea>}
            </div>
            <button onClick={handleFormSubmit} disabled={isSaving || !machineId || (status === 'Pending' && !pendingAction) || (status === 'Waiting Part' && !waitingPartName) || (isBypass && !bypassReason)} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase py-4 rounded-xl disabled:opacity-50 flex justify-center gap-2 active:scale-95">
              {showSuccess ? <CheckCircle className="w-6 h-6 animate-bounce" /> : 'Kirim Laporan'}
            </button>
          </>
        )}

        {activeTab === 'dashboard' && (
          <>
            <section>
              <h3 className="text-sm font-bold text-red-400 uppercase mb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5 animate-pulse" /> Critical / Bypassed</h3>
              {criticalTasks.length === 0 ? <div className="text-xs text-slate-500 p-4 border border-slate-800 rounded-xl text-center bg-slate-900/30">Aman.</div> : (
                <div className="space-y-3">
                  {criticalTasks.map(task => (
                    <div key={task.id} className="bg-red-950/20 border-l-4 border-l-red-500 border border-red-500/30 rounded-xl p-4">
                      <h4 className="font-bold text-red-100">{task.machine}</h4>
                      <p className="text-sm text-slate-400 mb-2">{task.issue}</p>
                      <div className="text-xs bg-red-950 text-red-300 p-2 rounded">Bypass: {task.bypassReason}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            
            <section className="mt-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase mb-3 flex items-center gap-2"><Clock className="w-5 h-5" /> Action Required</h3>
              {[...pendingTasks, ...waitingParts].length === 0 ? <div className="text-xs text-slate-500 p-4 border border-slate-800 rounded-xl text-center bg-slate-900/30">Tidak ada pending.</div> : (
                <div className="space-y-3">
                  {[...pendingTasks, ...waitingParts].map(task => {
                    const isPart = task.status === 'Waiting Part';
                    return (
                      <div key={task.id} className={`border border-slate-800 rounded-xl p-4 ${isPart ? 'bg-cyan-950/20 border-l-4 border-l-cyan-500' : 'bg-slate-900 border-l-4 border-l-amber-500'}`}>
                        <div className="flex justify-between items-start mb-2"><h4 className="font-bold text-white">{task.machine}</h4><span className="text-[10px] uppercase border px-2 py-0.5 rounded bg-slate-800 text-slate-300">{isPart ? 'WAITING PART' : 'PENDING'}</span></div>
                        <p className="text-sm text-slate-400 mb-2">{task.issue}</p>
                        {task.spvNote && <div className="text-xs bg-cyan-950 text-cyan-200 p-2 rounded mb-2 border border-cyan-800"><span className="font-bold text-cyan-400">SPV:</span> {task.spvNote}</div>}
                        <div className="text-xs bg-slate-950 p-2 rounded text-slate-300 mb-3">{isPart ? `Butuh: ${task.part}` : `Action: ${task.action || task.bypassReason}`}</div>
                        <button onClick={() => { setSelectedWO(task); setNewStatus('Tuntas'); setActionNotes(''); }} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold uppercase flex justify-center gap-2"><Play className="w-3 h-3" /> Tindak Lanjut</button>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'psa' && (
          <>
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center"><h2 className="text-sm font-semibold uppercase text-emerald-400"><Calendar className="w-4 h-4 inline mr-2"/>Tanggal</h2><input type="date" value={psaDate} onChange={(e) => setPsaDate(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 outline-none focus:border-emerald-500" /></div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800"><h2 className="text-sm font-semibold uppercase text-emerald-400"><MapPin className="w-4 h-4 inline mr-2"/>Lokasi Mesin</h2><select value={psaLocation} onChange={(e) => setPsaLocation(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 outline-none focus:border-emerald-500">{Object.keys(MASTER_PSA).map(loc => <option key={loc} value={loc}>{loc}</option>)}</select></div>
             </div>
             <div className="space-y-3 mt-4">
               <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase"><Box className="w-4 h-4 inline mr-2" />Input - {psaLocation}</h3>
               {(MASTER_PSA[psaLocation] || []).map((part) => (
                 <div key={part.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
                   <div className="flex justify-between items-start mb-3"><h4 className="font-bold text-slate-200 text-sm leading-tight pr-4">{part.name}</h4><div className="text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-800 flex flex-col items-center"><span className="text-slate-500">MIN: {part.min}</span><span className="text-slate-400">MAX: {part.max}</span></div></div>
                   <div className="grid grid-cols-2 gap-3">
                     <div><label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Tambah</label><input type="number" value={psaData[part.id]?.tambah || ''} onChange={(e) => handlePsaInputChange(part.id, 'tambah', e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm text-center text-slate-200"/></div>
                     <div><label className="text-[10px] text-emerald-500 uppercase font-bold mb-1 block">Total</label><input type="number" value={psaData[part.id]?.total || ''} onChange={(e) => handlePsaInputChange(part.id, 'total', e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-emerald-500/50 rounded-lg py-2 px-3 text-sm text-center text-emerald-100 font-bold"/></div>
                   </div>
                 </div>
               ))}
             </div>
             <button onClick={handlePsaSubmit} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase py-4 rounded-xl flex justify-center gap-2 active:scale-95">{showPsaSuccess ? <CheckCircle className="w-6 h-6 animate-bounce" /> : <><Save className="w-5 h-5"/> Simpan Data</>}</button>
          </>
        )}

        {activeTab === 'tpm' && (
          <>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center"><h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-2"><Database className="w-4 h-4"/> TPM Board</h2><button onClick={handleExportHistory} className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500 px-3 py-1.5 rounded flex items-center gap-1"><History className="w-3 h-3"/> Export</button></div>
              <select value={tpmLocation} onChange={(e) => setTpmLocation(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 outline-none focus:border-cyan-500">{Object.keys(MASTER_PSA).map(loc => <option key={loc} value={loc}>Stok: {loc}</option>)}</select>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {(MASTER_PSA[tpmLocation] || []).map(part => {
                const stockData = inventory.find(inv => inv.part_id === part.id && inv.location === tpmLocation) || inventory.find(inv => inv.id === part.id && inv.location === tpmLocation);
                const total = stockData ? parseInt(stockData.total_stock || stockData.totalStock) || 0 : 0;
                const isCritical = total < part.min;
                return (
                  <div key={part.id} className={`bg-slate-900 rounded-xl p-3 border ${isCritical ? 'border-red-500/50' : 'border-slate-800'} flex flex-col justify-between`}>
                    <div className="mb-2"><div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">{tpmLocation}</div><h4 className={`font-bold text-xs leading-tight ${isCritical ? 'text-red-100' : 'text-slate-200'}`}>{part.name}</h4></div>
                    <div className="flex justify-between items-end mt-2"><div className="text-[10px] text-slate-500 flex flex-col"><span>Min: {part.min}</span><span>Max: {part.max}</span></div><div className={`text-lg font-black px-2 py-0.5 rounded border ${isCritical ? 'bg-red-950 text-red-400 border-red-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{total}</div></div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-40 pb-4 pt-2">
        <div className="grid grid-cols-4 max-w-lg mx-auto px-2 gap-1">
          {[{ id: 'logbook', icon: PenTool, label: 'Logbook' }, { id: 'dashboard', icon: ClipboardList, label: 'Shift Board', alert: (criticalTasks.length > 0 || pendingTasks.length > 0) }, { id: 'psa', icon: Box, label: 'Isi PSA' }, { id: 'tpm', icon: Layers, label: 'TPM Board' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${activeTab === tab.id ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-500 hover:text-slate-300'}`}>
              <div className="relative"><tab.icon className="w-5 h-5 mb-1" />{tab.alert && <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-950"></span>}</div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-center">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// PORTAL SUPERVISOR 
// ==========================================
function SpvPortal({ userName, workOrders, approveBypass, addSpvNote, handleLogout }) {
  const [detailView, setDetailView] = useState(null); 
  const [noteInputs, setNoteInputs] = useState({});

  const handleExportData = () => {
    const headers = ['ID', 'Waktu Dilaporkan', 'Shift', 'Tim', 'Mesin', 'Kendala', 'Status', 'Oleh', 'Tindakan/Part', 'Dituntaskan Oleh', 'Safety'];
    const csvRows = workOrders.map(wo => `"${wo.id}","${wo.timestamp ? new Date(wo.timestamp).toLocaleString('id-ID') : '-'}","S${wo.shiftWaktu || '-'}","${wo.team || '-'}","${wo.machine}","${wo.issue}","${wo.status}","${wo.reqBy}","${wo.resolutionNote || wo.action || wo.part || ''}","${wo.resolvedBy || '-'}","${wo.isBypass ? (wo.spvApproved ? 'Bypass Norm' : 'Bypass AKTIF') : 'Aman'}"`);
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([[headers.join(','), ...csvRows].join('\n')], { type: 'text/csv;charset=utf-8;' }));
    link.setAttribute('download', `Maintenance_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const pendingApprovals = workOrders.filter(t => t.isBypass === true && t.spvApproved === false);
  const completedTasks = workOrders.filter(t => t.status === 'Tuntas');
  const activeIssues = workOrders.filter(t => t.status !== 'Tuntas' && !(t.isBypass === true && t.spvApproved === false));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
      {detailView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/50"><h2 className="font-bold text-white uppercase">{detailView === 'completed' ? 'Histori Selesai' : detailView === 'bypass' ? 'Safety Bypass' : 'Isu Handover'}</h2><button onClick={() => setDetailView(null)} className="text-slate-400 hover:text-white p-2"><X className="w-5 h-5"/></button></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(detailView === 'completed' ? completedTasks : detailView === 'bypass' ? pendingApprovals : activeIssues).map(wo => (
                <div key={wo.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex justify-between mb-2"><span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded uppercase font-bold text-cyan-400">{wo.status}</span><span className="text-xs text-slate-500">{wo.timestamp ? new Date(wo.timestamp).toLocaleString('id-ID') : '-'}</span></div>
                  <h3 className="font-bold text-white text-lg">{wo.machine}</h3>
                  <p className="text-sm text-slate-300 mb-3">{wo.issue}</p>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs space-y-2 border border-slate-800"><div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-500">Oleh:</span><span className="font-bold text-slate-200">{wo.reqBy} [S{wo.shiftWaktu}] [{wo.team}]</span></div><div className="flex justify-between"><span className="text-slate-500">Selesai:</span><span className="font-bold text-amber-500">{wo.resolvedBy || '⏳ Pending'}</span></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3"><Cpu className="w-6 h-6 text-cyan-500" /><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest uppercase">SPV Command</span></div>
        <div className="flex items-center gap-4">
          <button onClick={handleExportData} className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/30 hover:bg-emerald-600 hover:text-white px-4 py-1.5 rounded-lg border border-emerald-500/50"><Download className="w-4 h-4" /> Export</button>
          <div className="text-right hidden sm:block border-l border-slate-800 pl-4 pr-4 border-r"><div className="text-xs text-slate-500 uppercase">Logged in as</div><div className="text-sm font-bold text-cyan-400">SPV - {userName}</div></div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 px-3 py-1.5"><LogOut className="w-4 h-4" /> Keluar</button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div onClick={() => setDetailView('completed')} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl flex justify-between cursor-pointer"><div><div className="text-xs text-slate-500 uppercase mb-1">Tiket Selesai</div><div className="text-3xl font-bold text-white">{completedTasks.length}</div></div><div className="p-3 bg-slate-800 rounded-xl text-emerald-400"><CheckCircle className="w-6 h-6" /></div></div>
          <div onClick={() => setDetailView('bypass')} className="bg-slate-900 border border-slate-800 hover:border-red-500/50 p-5 rounded-2xl flex justify-between cursor-pointer"><div><div className="text-xs text-slate-500 uppercase mb-1">Bypass Aktif</div><div className="text-3xl font-bold text-white">{pendingApprovals.length}</div></div><div className="p-3 bg-slate-800 rounded-xl text-red-500"><ShieldAlert className="w-6 h-6" /></div></div>
          <div onClick={() => setDetailView('pending')} className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl flex justify-between cursor-pointer"><div><div className="text-xs text-amber-500/80 uppercase font-bold mb-1">Mesin Handover</div><div className="text-3xl font-bold text-amber-400">{activeIssues.length}</div></div><div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-amber-400"><Package className="w-6 h-6" /></div></div>
        </div>

        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-cyan-500 pl-2">Otorisasi SPV (Safety Bypass)</h2>
        {pendingApprovals.length === 0 ? <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 text-center text-slate-500">Pabrik aman. Tidak ada modifikasi keamanan aktif.</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingApprovals.map(task => (
              <div key={task.id} className="bg-slate-900 border border-red-500/30 p-5 rounded-2xl border-l-4 border-l-red-500 flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-white mb-1">{task.machine}</h3><div className="text-xs text-slate-400 mb-3">Oleh: {task.reqBy} [S{task.shiftWaktu}]</div>
                  <div className="bg-red-950/30 p-3 rounded-lg border border-red-500/20 mb-4"><div className="text-xs text-red-400 font-bold mb-1">Alasan Bypass:</div><p className="text-sm text-red-100">{task.bypassReason}</p></div>
                  <div className="pt-3 border-t border-slate-800">
                    <label className="text-xs text-cyan-400 font-bold mb-2 block uppercase">Pesan Teknisi:</label>
                    <div className="flex gap-2"><input type="text" value={noteInputs[task.id] || ''} onChange={(e) => setNoteInputs({...noteInputs, [task.id]: e.target.value})} className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"/><button onClick={() => { if (noteInputs[task.id]) { addSpvNote(task.id, noteInputs[task.id]); setNoteInputs({...noteInputs, [task.id]: ''}); } }} className="bg-cyan-950 text-cyan-400 px-3 rounded-lg text-xs font-bold border border-cyan-500/30">Kirim</button></div>
                  </div>
                </div>
                <button onClick={() => approveBypass(task.id)} className="w-full py-3 rounded-xl text-sm font-bold uppercase bg-red-600 text-white flex justify-center gap-2 active:scale-95"><ShieldCheck className="w-5 h-5" /> Normalize (To Pending)</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}