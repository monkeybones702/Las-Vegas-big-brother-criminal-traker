import React, { useState } from 'react';
import { Clock, Calendar, Camera, Search, ExternalLink } from 'lucide-react';
import { MAJOR_CITIES } from '../data/majorCities';

export const HistoricalSnapshotSearch: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('las_vegas');
  const [cameraId, setCameraId] = useState<string>('3207');
  const [date, setDate] = useState<string>('2024-04-02');
  const [startTime, setStartTime] = useState<string>('15:00');
  const [endTime, setEndTime] = useState<string>('17:30');

  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    const startIso = new Date(`${date}T${startTime}:00`).toISOString();
    const endIso = new Date(`${date}T${endTime}:00`).toISOString();
    
    try {
        const res = await fetch(`/api/snapshots?cameraId=${cameraId}&startTime=${startIso}&endTime=${endIso}`);
        const data = await res.json();
        if (data.success) {
            setSnapshots(data.snapshots);
        } else {
            console.error("Failed to fetch snapshots:", data.error);
        }
    } catch (err) {
        console.error("Snapshot fetch error:", err);
    } finally {
        setLoading(false);
    }
  };

  const activeCity = MAJOR_CITIES.find(c => c.id === selectedCityId) || MAJOR_CITIES[0];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-950 text-slate-100 rounded-lg border border-slate-800">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          Historical Snapshot Search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Metropolitan Network</label>
              <select className="bg-slate-800 p-2 rounded" value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)}>
                  {MAJOR_CITIES.map(c => <option key={c.id} value={c.id}>{c.displayName}</option>)}
              </select>
          </div>
          <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">CCTV Camera ID</label>
              <input type="text" className="bg-slate-800 p-2 rounded" value={cameraId} onChange={(e) => setCameraId(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Date</label>
              <input type="date" className="bg-slate-800 p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Start Time</label>
              <input type="time" className="bg-slate-800 p-2 rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">End Time</label>
              <input type="time" className="bg-slate-800 p-2 rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="flex items-end">
              <button onClick={handleSearch} disabled={loading} className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  {loading ? 'Fetching...' : 'Fetch Historical Snapshots'}
              </button>
          </div>
        </div>
      </div>

      {snapshots.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {snapshots.map((s) => (
                <div key={s.id} className="bg-slate-900 p-2 rounded border border-slate-800">
                    <img src={s.imageUrl} alt={s.timestamp} className="w-full aspect-video object-cover rounded" />
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{new Date(s.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
