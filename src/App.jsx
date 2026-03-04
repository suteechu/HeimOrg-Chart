import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building,
  ZoomIn,
  ZoomOut,
  Maximize,
  Search,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Target,
  Briefcase,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// --- 1. ACTUAL DATA (จากภาพที่อัปโหลด) ---
const hrData = {
  id: '1',
  name: 'คุณกิตตินันท์ ม่วงมั่น (กิต)',
  role: 'ผจก. การบุคคลและธุรการ',
  department: 'Management',
  email: 'kittinan.m@scgheim.com',
  phone: '08X-XXX-XXXX',
  location: 'สำนักงานใหญ่',
  status: 'Active',
  color: 'bg-[#da2128]', 
  image: '/images/kittinan.jpg', // <--- อ้างอิงไฟล์จาก public/images/kittinan.jpg
  skills: ['HR Management', 'Administration', 'Leadership'],
  responsibilities: [
    'บริหารจัดการงานบุคคลและธุรการราชการ (บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด)',
    'ดูแลงานบุคคลและธุรการ (บริษัท เซกิซุย-เอสซีจี อินดัสทรี จำกัด)',
    'ควบคุมและกำหนดกลยุทธ์ด้านทรัพยากรบุคคลของทั้ง 2 บริษัท'
  ],
  children: [
    // --- BRANCH 1: บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด ---
    {
      id: 'dept-1',
      isDept: true,
      name: 'พัฒนาพนักงานและธุรการราชการ',
      company: 'เอสซีจี-เซกิซุย เซลส์',
      color: 'bg-[#0f2846]',
      children: [
        {
          id: '1-1',
          name: 'คุณอรรถพล ธรรมนิภา (เอ็กซ์)',
          role: 'เจ้าหน้าที่ธุรการราชการ',
          department: 'พัฒนาพนักงานฯ',
          email: 'atthapon.t@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด',
          status: 'Active',
          color: 'bg-[#0f2846]',
          image: '/images/atthapon.jpg', // <--- แก้ไขลิงก์รูปตรงนี้
          responsibilities: [
            'การขออนุญาตก่อสร้าง',
            'การประกันภัยต่างๆ'
          ]
        },
        {
          id: '1-2',
          name: 'คุณณรงค์ฤทธิ์ ผลใหม่ (ลิฟท์)',
          role: 'เจ้าหน้าที่ธุรการราชการ',
          department: 'พัฒนาพนักงานฯ',
          email: 'narongrit.p@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด',
          status: 'Active',
          color: 'bg-[#0f2846]',
          image: '/images/narongrit.jpg', // <--- แก้ไขลิงก์รูปตรงนี้
          responsibilities: [
            'ดูแลงานขอทะเบียนบ้าน',
            'ขอมิเตอร์น้ำประปา ไฟฟ้า บ้านลูกค้า'
          ]
        }
      ]
    },
    // --- BRANCH 2: บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด ---
    {
      id: 'dept-2',
      isDept: true,
      name: 'ปฏิบัติงานบุคคล',
      company: 'เอสซีจี-เซกิซุย เซลส์',
      color: 'bg-[#0f2846]',
      children: [
        {
          id: '2-1',
          name: 'คุณอุมา แก้วแสงเอก (ขวัญ)',
          role: 'เจ้าหน้าที่บุคคล',
          department: 'ปฏิบัติงานบุคคล',
          email: 'uma.k@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด',
          status: 'Active',
          color: 'bg-[#0f2846]',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
          responsibilities: [
            'การเบิกค่ารักษาพยาบาลและประกันสังคม',
            'การเบิกเครื่องแบบพนักงาน',
            'จัดทำและตรวจสอบ Payroll',
            'งานฝึกอบรม'
          ]
        },
        {
          id: '2-2',
          name: 'คุณธัญลักษณ์ ชูสุทธิสกุล (ออย)',
          role: 'เจ้าหน้าที่บุคคล',
          department: 'ปฏิบัติงานบุคคล',
          email: 'thanyalak.c@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เอสซีจี-เซกิซุย เซลส์ จำกัด',
          status: 'Active',
          color: 'bg-[#0f2846]',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
          responsibilities: [
            'งานปฏิบัติงานบุคคล',
            'งานสรรหาพนักงาน',
            'การดูแลเกี่ยวกับระบบ e-HR',
            'การเบิกเบี้ยเลี้ยงและค่าเดินทาง',
            'จัดทำและตรวจสอบ Payroll'
          ]
        }
      ]
    },
    // --- BRANCH 3: บริษัท เซกิซุย-เอสซีจี อินดัสทรี จำกัด ---
    {
      id: 'dept-3',
      isDept: true,
      name: 'การบุคคลและธุรการ',
      company: 'เซกิซุย-เอสซีจี อินดัสทรี',
      color: 'bg-[#2b6cb0]', 
      children: [
        {
          id: '3-1',
          name: 'คุณวรรณนิศา อุ่นกาย (ศา)',
          role: 'เจ้าหน้าที่บุคคล',
          department: 'บุคคลและธุรการ',
          email: 'wannisa.a@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เซกิซุย-เอสซีจี อินดัสทรี จำกัด',
          status: 'Active',
          color: 'bg-[#2b6cb0]',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
          responsibilities: [
            'งานปฏิบัติงานบุคคล',
            'งานสรรหาพนักงาน',
            'การดูแลเกี่ยวกับระบบ e-HR',
            'ตรวจสอบการเบิกเบี้ยเลี้ยงและค่าเดินทาง',
            'จัดทำและตรวจสอบ Payroll',
            'งานผู้รับเหมา Piecework'
          ]
        },
        {
          id: '3-2',
          name: 'คุณกรวรรณ ใจตรง (ผิง)',
          role: 'เจ้าหน้าที่ธุรการ',
          department: 'บุคคลและธุรการ',
          email: 'korawan.j@scgheim.com',
          phone: '08X-XXX-XXXX',
          location: 'บริษัท เซกิซุย-เอสซีจี อินดัสทรี จำกัด',
          status: 'Active',
          color: 'bg-[#2b6cb0]',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
          responsibilities: [
            'งานปฏิบัติงานธุรการ',
            'การเบิกค่ารักษาพยาบาลและประกันสังคม',
            'การเบิกเครื่องแบบพนักงาน',
            'งานติดต่อหน่วยงานราชการ',
            'งานฝึกอบรม'
          ]
        }
      ]
    }
  ]
};

const getInitials = (name) => {
  if (!name) return 'HR';
  const parts = name.replace('คุณ', '').trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
  return parts[0].substring(0, 2);
};

const countEmployees = (node) => {
  let count = node.isDept ? 0 : 1;
  if (node.children) {
    node.children.forEach(child => { count += countEmployees(child); });
  }
  return count;
};

// --- 2. MODERN ORG NODE COMPONENT ---
// Added "depth" prop for staggered animation
const OrgNode = ({ node, searchTerm, onNodeClick, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  
  // Start animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsRendered(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isMatch = searchTerm && !node.isDept && (
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    node.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (node.responsibilities && node.responsibilities.some(r => r.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <li className="relative text-center list-none px-3 py-0 transition-all duration-500">
      <div className="flex flex-col items-center relative">
        
        {/* Entrance Animation Wrapper */}
        <div 
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isRendered ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          style={{ transitionDelay: `${depth * 150}ms` }}
        >
          {node.isDept ? (
            // --- MODERN DEPARTMENT NODE (PILL BADGE) ---
            <div className="relative z-10 w-auto min-w-[200px] h-[54px] px-5 flex items-center justify-between bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 mb-4 cursor-default">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${node.color} shadow-sm ring-4 ring-${node.color}/10 animate-pulse-slow`}></div>
                <div className="text-left">
                  <h3 className="text-[13px] font-bold text-slate-800 leading-none mb-0.5">{node.name}</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">{node.company}</p>
                </div>
              </div>
              {hasChildren && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                  className="ml-4 w-7 h-7 flex items-center justify-center bg-slate-50 hover:bg-slate-100 active:scale-95 rounded-full text-slate-400 hover:text-[#0f2846] transition-all"
                >
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              )}
            </div>
          ) : (
            // --- MODERN EMPLOYEE NODE (FLOATING AVATAR) ---
            <div 
              onClick={() => onNodeClick(node)}
              className={`
                relative group w-[260px] h-[290px] mt-12 flex flex-col bg-white/95 backdrop-blur-md rounded-[28px] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]
                transition-all duration-300 border border-slate-100/80 cursor-pointer
                ${isMatch ? 'ring-4 ring-[#da2128]/40 ring-offset-4 animate-pulse-glow' : ''}
                transform hover:-translate-y-2
              `}
            >
              {/* Highlight Sparkles for Search Match */}
              {isMatch && (
                <div className="absolute -top-14 -right-4 text-[#da2128] animate-bounce">
                  <Sparkles size={24} />
                </div>
              )}

              {/* Floating Avatar */}
              <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-[92px] h-[92px] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] border-[4px] border-white object-cover overflow-hidden bg-white z-10 group-hover:scale-110 transition-transform duration-500 ease-out ${!node.image ? (node.color || 'bg-slate-800') : ''}`}>
                {node.image ? (
                  <img src={node.image} alt={node.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(node.name)
                )}
              </div>
              
              <div className="pt-[54px] pb-5 px-5 flex flex-col items-center flex-1 w-full relative z-0">
                {/* Department Tag */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-[9px] uppercase font-bold tracking-wider rounded-full border border-slate-100 group-hover:bg-[#0f2846]/5 transition-colors">
                    <span className={`w-2 h-2 rounded-full ${node.color}`}></span>
                    {node.department}
                  </span>
                </div>

                {/* Name & Role */}
                <div className="text-center w-full min-w-0 flex-1 flex flex-col justify-start">
                  <h3 className="text-[16px] font-bold text-slate-800 leading-snug mb-1 group-hover:text-[#0f2846] transition-colors" title={node.name}>
                    {node.name}
                  </h3>
                  <p className="text-[13px] font-semibold text-[#da2128] mb-1" title={node.role}>
                    {node.role}
                  </p>
                </div>

                {/* Modern Action Buttons */}
                <div className="w-full mt-auto flex items-center justify-center gap-2 pt-4 shrink-0">
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${node.email}`; }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#da2128]/10 text-slate-400 hover:text-[#da2128] active:scale-90 transition-all"
                    title="Send Email"
                  >
                    <Mail size={16} />
                  </button>
                  <button 
                    className="flex-1 h-10 flex items-center justify-center gap-2 rounded-full bg-slate-50 group-hover:bg-[#0f2846] group-hover:text-white text-slate-500 hover:text-white transition-all duration-300 text-[12px] font-bold"
                  >
                    <span>ข้อมูลตำแหน่ง</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Expand/Collapse Toggle */}
              {hasChildren && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:border-[#da2128] text-slate-400 hover:text-[#da2128] active:scale-90 transition-all z-20 focus:outline-none"
                >
                  {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Children Branches */}
      {hasChildren && (
        <ul className={`flex justify-center relative transition-all duration-500 origin-top ${expanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 hidden'}`}>
          {node.children.map((child) => (
            <OrgNode key={child.id} node={child} searchTerm={searchTerm} onNodeClick={onNodeClick} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

// --- 3. MODERN EMPLOYEE DETAILS DRAWER COMPONENT ---
const ProfileDrawer = ({ employee, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !employee) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 
        transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-l-[32px] overflow-hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Modern Header (Clean Gradient) */}
        <div className={`h-40 shrink-0 relative bg-gradient-to-br from-slate-50 to-slate-200`}>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 bg-white/50 hover:bg-white p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm z-20 hover:rotate-90"
          >
            <X size={20} />
          </button>
          
          {/* Profile Image */}
          <div className="absolute -bottom-16 left-8 z-10">
            <div className={`w-32 h-32 rounded-[2rem] flex items-center justify-center text-white font-bold text-4xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[5px] border-white object-cover overflow-hidden bg-white ${!employee.image ? (employee.color || 'bg-slate-800') : ''}`}>
              {employee.image ? (
                <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(employee.name)
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 pb-8 px-8 bg-white">
          <div className="flex items-center gap-2 mb-1 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
             <span className={`w-2.5 h-2.5 rounded-full ${employee.color} animate-pulse`}></span>
             <h2 className="text-2xl font-bold text-slate-800 leading-tight">{employee.name}</h2>
          </div>
          <p className="text-[17px] font-semibold text-[#da2128] mb-6 animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>{employee.role}</p>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#0f2846]">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Department</p>
                <p className="text-[14px] font-semibold text-slate-800">{employee.department}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors animate-fade-in" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#0f2846]">
                <Building size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Company</p>
                <p className="text-[14px] font-semibold text-slate-800">{employee.location}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2 mb-5">
              <Target size={18} className="text-[#da2128]" />
              ความรับผิดชอบหลัก
            </h3>
            {employee.responsibilities && employee.responsibilities.length > 0 ? (
              <ul className="space-y-4">
                {employee.responsibilities.map((task, idx) => (
                  <li key={idx} className="flex items-start bg-white hover:-translate-y-0.5 transition-transform cursor-default">
                    <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 mr-3">
                      <div className={`w-2 h-2 rounded-full ${employee.color}`}></div>
                    </div>
                    <span className="text-[14px] text-slate-600 leading-relaxed font-medium">{task}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl">ไม่มีระบุข้อมูลรายละเอียดงาน</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- 4. MAIN DASHBOARD APP ---
export default function App() {
  const [zoom, setZoom] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Drag to pan state
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeadcount = useMemo(() => countEmployees(hrData), []);
  const totalDepts = hrData.children.length;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(1);

  // --- Drag to Pan Logic ---
  const handleMouseDown = (e) => {
    if (!canvasRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - canvasRef.current.offsetLeft);
    setStartY(e.pageY - canvasRef.current.offsetTop);
    setScrollLeft(canvasRef.current.scrollLeft);
    setScrollTop(canvasRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !canvasRef.current) return;
    e.preventDefault();
    const x = e.pageX - canvasRef.current.offsetLeft;
    const y = e.pageY - canvasRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // Scroll-fast multiplier
    const walkY = (y - startY) * 1.5;
    canvasRef.current.scrollLeft = scrollLeft - walkX;
    canvasRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] font-sans flex flex-col overflow-hidden relative selection:bg-[#da2128]/20">
      
      {/* CSS for Animations & Scrollbars */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap');

        .font-sans {
          font-family: 'Prompt', sans-serif !important;
        }

        /* Custom Thin Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(218, 33, 40, 0); }
          50% { box-shadow: 0 0 0 10px rgba(218, 33, 40, 0.2); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Modern Tree Connecting Lines */
        .org-tree ul {
          padding-top: 48px;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .org-tree li {
          float: left;
          text-align: center;
          list-style-type: none;
          position: relative;
          padding: 48px 12px 0 12px; 
        }
        .org-tree li::before, .org-tree li::after {
          content: '';
          position: absolute;
          top: 0;
          right: 50%;
          border-top: 2px solid #cbd5e1;
          width: 50%;
          height: 48px; 
          transition: all 0.3s;
        }
        .org-tree li::after {
          right: auto;
          left: 50%;
          border-left: 2px solid #cbd5e1;
        }
        .org-tree li:only-child::after, .org-tree li:only-child::before {
          display: none;
        }
        .org-tree li:only-child {
          padding-top: 0;
        }
        .org-tree li:first-child::before, .org-tree li:last-child::after {
          border: 0 none;
        }
        .org-tree li:last-child::before {
          border-right: 2px solid #cbd5e1;
          border-radius: 0 16px 0 0;
        }
        .org-tree li:first-child::after {
          border-radius: 16px 0 0 0;
        }
        .org-tree ul ul::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          border-left: 2px solid #cbd5e1;
          width: 0;
          height: 48px;
          transform: translateX(-50%);
        }
        
        /* Hover line color effect */
        .org-tree li:hover::before, 
        .org-tree li:hover::after, 
        .org-tree li:hover > ul::before, 
        .org-tree li:hover > ul > li::before, 
        .org-tree li:hover > ul > li::after {
          border-color: #94a3b8;
        }
      `}</style>

      {/* Modern Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between z-20 flex-shrink-0 relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#0f2846] to-[#1e4066] p-3 rounded-2xl shadow-lg shadow-[#0f2846]/20 transform hover:scale-105 transition-transform cursor-pointer">
            <Building className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">SCG HEIM</h1>
            <p className="text-[13px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">HR Organization</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-80 group">
          <Search className="absolute left-4 text-slate-400 group-focus-within:text-[#da2128] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหาชื่อ, ตำแหน่ง..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-5 py-3 text-[14px] font-medium border border-transparent bg-slate-100/80 rounded-full focus:outline-none focus:border-[#da2128]/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(218,33,40,0.1)] transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-4 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* Modern Secondary Toolbar & Metrics */}
      <div className="bg-transparent px-8 py-4 flex flex-col sm:flex-row items-center justify-between z-10 flex-shrink-0 pointer-events-none">
        <div className="flex gap-4 mb-3 sm:mb-0 pointer-events-auto">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
            <div className="w-8 h-8 rounded-full bg-[#0f2846]/10 flex items-center justify-center text-[#0f2846] font-bold">
              {totalHeadcount}
            </div>
            <span className="text-[12px] uppercase text-slate-500 font-bold tracking-wide">Members</span>
          </div>
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
            <div className="w-8 h-8 rounded-full bg-[#da2128]/10 flex items-center justify-center text-[#da2128] font-bold">
              {totalDepts}
            </div>
            <span className="text-[12px] uppercase text-slate-500 font-bold tracking-wide">Depts</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-200 p-1.5 gap-1 pointer-events-auto">
          <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors active:scale-90" title="Zoom Out">
            <ZoomOut size={16} />
          </button>
          <span className="text-[12px] font-bold w-12 text-center text-slate-600 select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors active:scale-90" title="Zoom In">
            <ZoomIn size={16} />
          </button>
          <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
          <button onClick={handleResetZoom} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#0f2846] rounded-full transition-colors active:scale-90" title="Reset View">
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* Main Canvas Area (Draggable) */}
      <main 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex-1 overflow-auto relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
             backgroundSize: '24px 24px',
             backgroundPosition: `${-scrollLeft * 0.2}px ${-scrollTop * 0.2}px` // Parallax effect
           }}>
        </div>

        <div className="min-w-max min-h-full flex items-start justify-center p-8 lg:p-16 transition-transform duration-200 ease-out origin-top"
             style={{ transform: `scale(${zoom})` }}>
          
          <div className="org-tree inline-block pb-32">
            <ul className="m-0 p-0">
              <OrgNode 
                node={hrData} 
                searchTerm={searchTerm} 
                onNodeClick={(node) => {
                  if(!isDragging) setSelectedEmployee(node);
                }} 
                depth={0} 
              />
            </ul>
          </div>

        </div>
      </main>

      {/* Profile Detail Drawer */}
      <ProfileDrawer 
        employee={selectedEmployee} 
        isOpen={!!selectedEmployee} 
        onClose={() => setSelectedEmployee(null)} 
      />
      
    </div>
  );
}