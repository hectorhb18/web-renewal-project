import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, School, GraduationCap, MapPin, Target, Camera, Save, Lock, Check } from 'lucide-react';
import { loadState, updateUser } from '../../lib/store';

interface Props {
  onStateChange: () => void;
}

const AVATAR_EMOJIS = ['🎓', '📚', '🧠', '🚀', '⭐', '🌟', '💡', '🎯', '🔬', '🧪', '📐', '🎨'];

export default function Perfil({ onStateChange }: Props) {
  const [state, setState] = useState(loadState);
  const [form, setForm] = useState({
    name:    state.user?.name    || '',
    email:   state.user?.email   || '',
    colegio: state.user?.colegio || '',
    grado:   state.user?.grado   || '',
    pais:    state.user?.pais    || 'Perú',
    metas:   state.user?.metas   || '',
    avatar:  state.user?.avatar  || '🎓',
  });
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    updateUser(form);
    setState(loadState());
    onStateChange();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePwd = () => {
    if (pwd.next.length < 6) return setPwdMsg('Mínimo 6 caracteres');
    if (pwd.next !== pwd.confirm) return setPwdMsg('Las contraseñas no coinciden');
    setPwdMsg('✅ Contraseña actualizada (demo local)');
    setPwd({ current: '', next: '', confirm: '' });
    setTimeout(() => { setShowPwd(false); setPwdMsg(''); }, 1500);
  };

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setForm({ ...form, avatar: r.result as string });
    r.readAsDataURL(f);
  };

  const isEmoji = form.avatar.length <= 4;
  const initials = (form.name || 'E').charAt(0).toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-surface-900 flex items-center gap-2">
          <User className="w-7 h-7 text-primary-600" /> Mi Perfil
        </h1>
        <p className="text-surface-500 text-sm mt-1">Personaliza tu información y metas académicas</p>
      </div>

      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden shadow-lg shadow-primary-200/40">
            {form.avatar
              ? isEmoji
                ? <span>{form.avatar}</span>
                : <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
              : initials}
          </div>
          <button onClick={() => fileRef.current?.click()}
            className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white border border-surface-200 shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all">
            <Camera className="w-4 h-4" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={uploadPhoto} className="hidden" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-surface-900">{form.name || 'Estudiante'}</h2>
          <p className="text-sm text-surface-500">{form.email || 'sin correo'}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            <span className="text-xs font-semibold bg-primary-50 text-primary-700 px-3 py-1 rounded-full">{state.xp} XP</span>
            <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-3 py-1 rounded-full">🔥 {state.streak} días</span>
            {form.grado && <span className="text-xs font-semibold bg-surface-100 text-surface-700 px-3 py-1 rounded-full">{form.grado}</span>}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            <p className="text-xs text-surface-400 w-full mb-1">Elige un avatar:</p>
            {AVATAR_EMOJIS.map((e) => (
              <button key={e} onClick={() => setForm({ ...form, avatar: e })}
                className={`w-9 h-9 rounded-lg text-lg transition-all ${
                  form.avatar === e ? 'bg-primary-100 ring-2 ring-primary-400' : 'bg-surface-50 hover:bg-surface-100'
                }`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-bold text-surface-900">Información personal</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field icon={User}   label="Nombre completo" value={form.name}    onChange={(v) => setForm({ ...form, name: v })} />
          <Field icon={Mail}   label="Correo"          value={form.email}   onChange={(v) => setForm({ ...form, email: v })} type="email" />
          <Field icon={School} label="Colegio"         value={form.colegio} onChange={(v) => setForm({ ...form, colegio: v })} placeholder="Ej. COAR Lima" />
          <Field icon={GraduationCap} label="Grado"    value={form.grado}   onChange={(v) => setForm({ ...form, grado: v })} placeholder="Ej. 5to secundaria" />
          <Field icon={MapPin} label="País"            value={form.pais}    onChange={(v) => setForm({ ...form, pais: v })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-surface-600 mb-2 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-primary-500" /> Metas académicas
          </label>
          <textarea value={form.metas} onChange={(e) => setForm({ ...form, metas: e.target.value })}
            rows={3} placeholder="Ej. Ingresar a la UNI, dominar cálculo, aprender inglés fluido…"
            className="w-full border border-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none" />
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={save} className="btn-primary text-sm !py-3 !px-6 flex items-center gap-2">
            {saved ? <><Check className="w-4 h-4" /> Guardado</> : <><Save className="w-4 h-4" /> Guardar cambios</>}
          </button>
          <button onClick={() => setShowPwd(!showPwd)}
            className="text-sm font-semibold text-surface-600 hover:text-primary-600 px-4 py-3 rounded-xl border border-surface-200 hover:border-primary-300 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Cambiar contraseña
          </button>
        </div>

        {showPwd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-surface-100 pt-5 space-y-3">
            <input type="password" placeholder="Contraseña actual" value={pwd.current}
              onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
              className="w-full border border-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
            <input type="password" placeholder="Nueva contraseña" value={pwd.next}
              onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
              className="w-full border border-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
            <input type="password" placeholder="Confirmar nueva contraseña" value={pwd.confirm}
              onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
              className="w-full border border-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
            {pwdMsg && <p className="text-xs text-surface-600">{pwdMsg}</p>}
            <button onClick={changePwd} className="btn-primary text-sm !py-2.5 !px-5">Actualizar</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text', placeholder }: {
  icon: any; label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-surface-600 mb-2 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-primary-500" /> {label}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
    </div>
  );
}
