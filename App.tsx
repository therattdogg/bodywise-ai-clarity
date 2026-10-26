import React, { useState } from 'react';
import {
  ShieldCheck,
  Camera,
  Sparkles,
  Activity,
  Lock,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  Download,
  Trash2
} from 'lucide-react';

export default function BeBodywiseAIClarityApp() {
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [activeTab, setActiveTab] = useState<'scanner' | 'dashboard' | 'triage' | 'privacy'>('scanner');

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<{
    hairDensity: number;
    densityChange: number;
    lpipsScore: number;
    status: string;
    stage: string;
  } | null>(null);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; badge?: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am your Be Bodywise Clinical AI Assistant. How is your current regimen feeling? You can report active symptoms, skin purging, or hair shedding.',
      badge: 'DPDP Encrypted'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [dataDeleted, setDataDeleted] = useState(false);

  const handleAcceptConsent = () => {
    setHasConsent(true);
    setShowConsentModal(false);
    setDataDeleted(false);
  };

  const runMicroScan = () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }
    setIsScanning(true);
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      setScannedImage('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600');
      setScanResults({
        hairDensity: 142,
        densityChange: +8.4,
        lpipsScore: 0.042,
        status: 'Early Follicular Activation Detected',
        stage: 'Week 4: Micro-Vellus Emergence'
      });
      setActiveTab('dashboard');
    }, 1800);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQuery = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "Based on your clinical care plan, your symptoms appear consistent with normal active ingredient adjustment.";
      let badgeText = "Normal Progress";
      const q = userQuery.toLowerCase();

      if (q.includes('burning') || q.includes('rash') || q.includes('severe')) {
        aiResponse = "WARNING: Your reported symptoms indicate potential severe contact dermatitis or skin barrier disruption. Please pause product application immediately. I am escalating your profile to a Be Bodywise dermatologist for urgent teleconsultation review.";
        badgeText = "Urgent Doctor Escalation Triggered";
      } else if (q.includes('purging') || q.includes('acne') || q.includes('pimple')) {
        aiResponse = "Rhea, experiencing mild acne breakouts during Weeks 2-3 of Niacinamide or Salicylic Acid application is normal skin purging. Active ingredients accelerate cellular turnover, pushing micro-comedones to the surface. Continue application; purging subsides by Week 4.";
        badgeText = "Expected Skin Purging Phase";
      } else if (q.includes('shedding') || q.includes('hair fall') || q.includes('loss')) {
        aiResponse = "Ananya, initial hair shedding during Weeks 2-4 of Redensyl + Procapil application is a positive clinical indicator. Early telogen hair strands shed to make room for stronger, denser anagen growth phases. Your scalp scan verifies early follicular activation.";
        badgeText = "Anagen Phase Transition";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, badge: badgeText }]);
    }, 800);
  };

  const handleExportRecords = () => {
    const record = {
      exportedAt: new Date().toISOString(),
      consentGranted: hasConsent,
      scanResults,
      triageLog: chatMessages
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bebodywise-health-records.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRequestDeletion = () => {
    setDataDeleted(true);
    setScannedImage(null);
    setScanResults(null);
    setChatMessages([]);
    setHasConsent(false);
    setTimeout(() => {
      alert("DPDP Compliance Action: Certificate of Data Destruction issued. All visual scans and health records purged across application servers.");
    }, 500);
  };

  const tabs = [
    { id: 'scanner', label: 'AI Micro-Scanner', Icon: Camera },
    { id: 'dashboard', label: 'Efficacy Analytics', Icon: Activity },
    { id: 'triage', label: 'Clinical AI Assistant', Icon: MessageSquare },
    { id: 'privacy', label: 'Privacy & Rights', Icon: ShieldCheck }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-pink-600 text-white p-2 rounded-xl font-bold tracking-wider text-sm flex items-center space-x-1">
              <span>BE BODYWISE</span>
            </div>
            <span className="text-xs bg-pink-100 text-pink-700 font-semibold px-2.5 py-1 rounded-full border border-pink-200">
              AI Clarity Engine v2.4
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-700">DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 flex space-x-6 text-sm font-medium overflow-x-auto whitespace-nowrap">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-3 border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === id ? 'border-pink-600 text-pink-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Sub-Visual Follicular & Skin Scanner</h2>
                <p className="text-slate-600 text-sm mb-6">
                  Biological recovery takes 90–120 days. Our edge computer vision algorithms analyze millimeter-level hair density (strands/cm²) and texture variations to verify micro-progress before it becomes visible.
                </p>

                <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center min-h-[280px]">
                  {isScanning ? (
                    <div className="space-y-4 w-full max-w-xs">
                      <RefreshCw className="w-10 h-10 text-pink-600 animate-spin mx-auto" />
                      <div className="text-sm font-semibold text-slate-700">Analyzing Follicular Spatial Density...</div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-pink-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-400">Applying UV Latent Alignment & LPIPS Texture Loss...</p>
                    </div>
                  ) : scannedImage ? (
                    <div className="space-y-4">
                      <img src={scannedImage} alt="Scalp Capture" className="w-48 h-48 object-cover rounded-xl border-2 border-pink-500 shadow-md mx-auto" />
                      <div className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium inline-block">
                        Scan Verified & Processed
                      </div>
                      {scanResults && (
                        <div className="text-xs text-slate-600">
                          <div className="font-semibold text-slate-800">{scanResults.status}</div>
                          <div>{scanResults.stage} • {scanResults.hairDensity} strands/cm² (+{scanResults.densityChange}%)</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Align Scalp or Facial Zone</h3>
                        <p className="text-xs text-slate-500 mt-1">Position macro camera 5cm from target skin area under clear lighting.</p>
                      </div>
                      <button
                        onClick={runMicroScan}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-2 mx-auto"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Simulate Micro-Scan</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center space-x-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Face landmarks automatically masked on client device prior to cloud analysis.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Quantitative Progress Analytics</h2>
                  <p className="text-xs text-slate-500">Regimen: Hair Growth Serum (3% Redensyl + Procapil) • Day 28</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Efficacy Tracked On-Schedule</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Spatial Hair Density</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold text-slate-900">142</span>
                    <span className="text-xs text-slate-500">strands/cm²</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 mt-2">
                    +8.4% vs Baseline (131 strands/cm²)
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">LPIPS Visual Variance</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold text-slate-900">0.042</span>
                    <span className="text-xs text-slate-500">LPIPS Delta</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 mt-2">
                    Micro-Vellus Emergence Verified
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Regimen Adherence Score</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold text-slate-900">96%</span>
                  </div>
                  <div className="text-xs font-semibold text-pink-600 mt-2">
                    27 / 28 Daily Applications Logged
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 mb-3 text-sm">Longitudinal Micro-Scan Comparison</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-500 mb-2 block">Day 1 Baseline Scan</span>
                  <div className="w-full h-36 bg-slate-300 rounded-lg flex items-center justify-center text-xs text-slate-600 font-mono px-2">
                    Baseline Scan [131 strands/cm²]
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-pink-600 mb-2 block">Day 28 Follow-Up Scan</span>
                  <div className="w-full h-36 bg-pink-100 border-2 border-pink-400 rounded-lg flex items-center justify-center text-xs text-pink-800 font-mono font-semibold px-2">
                    Current Scan [142 strands/cm²]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'triage' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <span className="font-bold text-sm">Be Bodywise Clinical Triage Engine</span>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">RAG Medical Guardrails Active</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-md p-3.5 rounded-2xl text-sm ${
                      msg.sender === 'user' ? 'bg-pink-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded mt-1 ${
                        msg.badge.includes('Urgent') ? 'bg-red-100 text-red-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {msg.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about skin purging, hair shedding, or dosage..."
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-pink-600"
                />
                <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all">
                  Send
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 font-medium self-center">Try asking:</span>
              <button onClick={() => setChatInput("I'm getting small pimples during week 2 of serum usage. Is this purging?")} className="bg-white border border-slate-200 hover:border-pink-400 px-3 py-1.5 rounded-lg text-slate-700">
                "Is my skin purging?"
              </button>
              <button onClick={() => setChatInput("My hair shedding increased in week 3 of Redensyl. Should I stop?")} className="bg-white border border-slate-200 hover:border-pink-400 px-3 py-1.5 rounded-lg text-slate-700">
                "Increased hair shedding?"
              </button>
              <button onClick={() => setChatInput("I have severe burning and a rash after applying the serum.")} className="bg-white border border-slate-200 hover:border-red-400 px-3 py-1.5 rounded-lg text-slate-700">
                "Burning and rash?"
              </button>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">DPDP Act 2023 Privacy Portal</h2>
              <p className="text-slate-600 text-sm mb-6">
                Under Sections 6 and 12 of the Digital Personal Data Protection Act 2023, you retain full rights over your biometric scans and personal health data.
              </p>

              {dataDeleted && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cascade erasure complete. Consent revoked; scans, embeddings and chat logs purged.</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap gap-3 items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-slate-800">Download Health Records</h3>
                    <p className="text-xs text-slate-500">Export structured JSON file containing all scalp metrics and triage logs.</p>
                  </div>
                  <button onClick={handleExportRecords} className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Records</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex flex-wrap gap-3 items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-red-900">Revoke Consent & Cascade Delete</h3>
                    <p className="text-xs text-red-700">Permanently purge visual scans, embeddings, and telemetry across cloud buckets.</p>
                  </div>
                  <button onClick={handleRequestDeletion} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Execute Cascade Erasure</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 text-pink-600">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-bold text-lg text-slate-900">DPDP Act 2023 Consent Notice</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mosaic Wellness (Data Fiduciary) requests explicit consent to process your scalp/skin macro imagery and health log data solely for generating micro-density progress metrics and clinical triage.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <div className="flex items-center space-x-1 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>No bundled terms or pre-ticked consent boxes.</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Edge-level metadata scrubbing before cloud storage.</span>
              </div>
            </div>
            <div className="pt-2 flex space-x-3">
              <button onClick={handleAcceptConsent} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-all shadow-md">
                Grant Explicit Opt-In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
