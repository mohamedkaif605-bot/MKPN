import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('read');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMasterModal, setShowMasterModal] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [masterKey, setMasterKey] = useState('');

  const [articles, setArticles] = useState([
    {
      id: 'himalayas',
      title: 'The Himalayas',
      category: 'Geography',
      content: "The Himalayas, or Himalaya, is a majestic mountain range in Asia separating the plains of the Indian subcontinent from the Tibetan Plateau. The range includes over 100 peaks exceeding 7,200 meters (23,600 ft), featuring the planet's highest summit, Mount Everest.\n\nThe vast range stretches across five countries: Bhutan, India, Nepal, China, and Pakistan. It shapes regional climates, freshwater sources, and cultural traditions across South Asia."
    }
  ]);
  const [currentArticleId, setCurrentArticleId] = useState('himalayas');
  const [newTitle, setNewTitle] = useState('');git init
  const [newCategory, setNewCategory] = useState('News');
  const [newContent, setNewContent] = useState('');

  const activeArticle = articles.find(a => a.id === currentArticleId) || articles[0];

  // Editor Login: MDKAIF@290603 / MDKAIF@290603
  const handleEditorLogin = (e) => {
    e.preventDefault();
    if (username === 'MDKAIF@290603' && password === 'MDKAIF@290603') {
      setIsEditor(true);
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid username or password.');
    }
  };

  // Master Admin Terminal Login: MKPN-MASTER-8042
  const handleMasterLogin = (e) => {
    e.preventDefault();
    if (masterKey.trim() === 'MKPN-MASTER-8042') {
      setIsAdmin(true);
      setIsEditor(true); // Super admin inherits editor rights
      setShowMasterModal(false);
      setMasterKey('');
    } else {
      alert('Invalid Master Key.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditor(false);
    setActiveTab('read');
  };

  const handleAddArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const newArt = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      content: newContent
    };
    setArticles([...articles, newArt]);
    setCurrentArticleId(newArt.id);
    setNewTitle('');
    setNewContent('');
    setActiveTab('read');
  };

  const handleDeleteArticle = (id) => {
    if (articles.length <= 1) {
      alert('At least one article must remain.');
      return;
    }
    const filtered = articles.filter(a => a.id !== id);
    setArticles(filtered);
    setCurrentArticleId(filtered[0].id);
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.brand}>
            <div style={styles.logoBadge}>M</div>
            <div>
              <div style={styles.brandTitle}>MKPN</div>
              <div style={styles.brandSubtitle}>Encyclopedia</div>
            </div>
          </div>

          <div style={styles.navHeader}>Articles</div>
          <ul style={styles.articleList}>
            {articles.map(art => (
              <li key={art.id}>
                <button 
                  style={currentArticleId === art.id ? { ...styles.articleBtn, ...styles.articleBtnActive } : styles.articleBtn}
                  onClick={() => { setCurrentArticleId(art.id); setActiveTab('read'); }}
                >
                  {art.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* HIDDEN π MASTER ADMIN DOOR */}
        <div>
          <button 
            style={styles.hiddenDoor} 
            title="Root Console" 
            onClick={() => setShowMasterModal(true)}
          >
            🔒 π
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main style={styles.main}>
        {/* TOP BAR */}
        <header style={styles.header}>
          <input type="text" placeholder="Search MKPN Encyclopedia..." style={styles.searchInput} />
          <div style={styles.authArea}>
            {isAdmin && <span style={styles.badgeMaster}>● Root Master</span>}
            {isEditor && !isAdmin && <span style={styles.badgeEditor}>● Editor Mode</span>}
            
            {isEditor || isAdmin ? (
              <button onClick={handleLogout} style={styles.btnSecondary}>Log Out</button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} style={styles.btnLogin}>Log in</button>
            )}
          </div>
        </header>

        {/* NAVIGATION TABS */}
        <div style={styles.tabsStrip}>
          <button 
            style={activeTab === 'read' ? { ...styles.tab, ...styles.tabActive } : styles.tab} 
            onClick={() => setActiveTab('read')}
          >
            Read
          </button>
          
          <button 
            style={activeTab === 'history' ? { ...styles.tab, ...styles.tabActive } : styles.tab} 
            onClick={() => setActiveTab('history')}
          >
            View History
          </button>

          {/* Unlocked for Editor / Super Admin */}
          {isEditor && (
            <button 
              style={activeTab === 'add' ? { ...styles.tab, ...styles.tabActive } : styles.tab} 
              onClick={() => setActiveTab('add')}
            >
              + Add Content
            </button>
          )}

          {isEditor && (
            <button 
              style={activeTab === 'manage' ? { ...styles.tab, ...styles.tabActive } : styles.tab} 
              onClick={() => setActiveTab('manage')}
            >
              Manage
            </button>
          )}

          {/* Unlocked strictly for Master Key */}
          {isAdmin && (
            <button 
              style={activeTab === 'system' ? { ...styles.tab, ...styles.tabAdminActive } : styles.tab} 
              onClick={() => setActiveTab('system')}
            >
              System Code
            </button>
          )}
        </div>

        {/* CONTENT AREA */}
        <article style={styles.paper}>
          {activeTab === 'read' && (
            <div>
              <h1 style={styles.title}>{activeArticle.title}</h1>
              <div style={styles.meta}>From MKPN, the free public encyclopedia • Category: {activeArticle.category}</div>
              <hr style={styles.hr} />
              <div style={styles.bodyText}>
                {activeArticle.content.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 style={styles.subHeading}>Revision History</h2>
              <hr style={styles.hr} />
              <ul style={styles.historyList}>
                <li><strong>20 Sept 2026, 12:00 PM:</strong> Verified public release by MKPN Master.</li>
                <li><strong>System:</strong> Protected under MKPN dual-tier administrative security.</li>
              </ul>
            </div>
          )}

          {activeTab === 'add' && isEditor && (
            <div>
              <h2 style={styles.subHeading}>Publish New Article</h2>
              <form onSubmit={handleAddArticle} style={styles.form}>
                <label style={styles.label}>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={styles.input}>
                  <option value="News">News</option>
                  <option value="Sports">Sports</option>
                  <option value="Politics">Politics</option>
                  <option value="Geography">Geography</option>
                  <option value="Technology">Technology</option>
                </select>

                <label style={styles.label}>Article Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="Enter title..." 
                  style={styles.input} 
                  required 
                />

                <label style={styles.label}>Content</label>
                <textarea 
                  value={newContent} 
                  onChange={e => setNewContent(e.target.value)} 
                  placeholder="Write article paragraphs..." 
                  style={{ ...styles.input, minHeight: '200px', resize: 'vertical' }} 
                  required 
                />

                <button type="submit" style={styles.btnPublish}>Publish Article</button>
              </form>
            </div>
          )}

          {activeTab === 'manage' && isEditor && (
            <div>
              <h2 style={styles.subHeading}>Manage Articles</h2>
              <hr style={styles.hr} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {articles.map(art => (
                  <div key={art.id} style={styles.manageItem}>
                    <div>
                      <strong>{art.title}</strong> — <span style={{ color: '#64748b' }}>{art.category}</span>
                    </div>
                    <button onClick={() => handleDeleteArticle(art.id)} style={styles.btnDelete}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && isAdmin && (
            <div style={styles.terminalBox}>
              <h3 style={{ color: '#4ade80', marginBottom: '12px' }}>[MKPN ROOT TERMINAL]</h3>
              <p style={{ color: '#cbd5e1', fontSize: '13px' }}>Master Mode: Active (MKPN-MASTER-8042)</p>
              <pre style={styles.codeBlock}>
{`// Root Access Config
SECURITY_TIER: LEVEL_2
RESTRICTED_ACCESS: ACTIVE
CORE_REVISION: v2.4.0-stable`}
              </pre>
            </div>
          )}
        </article>
      </main>

      {/* PUBLIC LOGIN MODAL (EDITOR) */}
      {showLoginModal && (
        <div style={styles.modalBg}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: '12px' }}>Editor Login</h3>
            <form onSubmit={handleEditorLogin} style={styles.form}>
              <input 
                type="text" 
                placeholder="Username (e.g. MDKAIF@290603)" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                style={styles.input} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={styles.input} 
                required 
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setShowLoginModal(false)} style={styles.btnSecondary}>Cancel</button>
                <button type="submit" style={styles.btnLogin}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HIDDEN ROOT ACCESS MODAL (MASTER) */}
      {showMasterModal && (
        <div style={styles.modalBg}>
          <div style={{ ...styles.modal, background: '#0f172a', color: '#f8fafc' }}>
            <h3 style={{ color: '#f8fafc', marginBottom: '8px' }}>Root Terminal</h3>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>Enter the Master Access Key.</p>
            <form onSubmit={handleMasterLogin} style={styles.form}>
              <input 
                type="password" 
                placeholder="Master Key..." 
                value={masterKey} 
                onChange={e => setMasterKey(e.target.value)} 
                style={{ ...styles.input, background: '#1e293b', color: 'white', borderColor: '#334155' }} 
                autoFocus 
                required 
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setShowMasterModal(false)} style={{ ...styles.btnSecondary, color: '#94a3b8' }}>Cancel</button>
                <button type="submit" style={{ ...styles.btnLogin, background: '#ef4444' }}>Authenticate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  sidebar: { width: '250px', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh', position: 'sticky', top: 0 },
  brand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
  logoBadge: { width: '38px', height: '38px', borderRadius: '8px', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' },
  brandTitle: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' },
  brandSubtitle: { fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' },
  navHeader: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', margin: '16px 0 8px 8px' },
  articleList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' },
  articleBtn: { width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', borderRadius: '6px', fontSize: '14px', color: '#334155', cursor: 'pointer' },
  articleBtnActive: { background: '#eff6ff', color: '#2563eb', fontWeight: '600' },
  hiddenDoor: { background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '14px', padding: '6px' },
  main: { flex: 1, padding: '28px 48px', maxWidth: '1100px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  searchInput: { width: '320px', padding: '10px 18px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' },
  authArea: { display: 'flex', alignItems: 'center', gap: '12px' },
  badgeMaster: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  badgeEditor: { background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  btnLogin: { background: '#2563eb', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  btnSecondary: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' },
  tabsStrip: { display: 'flex', gap: '4px', borderBottom: '1px solid #cbd5e1', marginBottom: '24px' },
  tab: { padding: '10px 18px', background: 'none', border: 'none', borderBottom: '2px solid transparent', cursor: 'pointer', fontSize: '14px', color: '#64748b', fontWeight: '500' },
  tabActive: { color: '#2563eb', borderBottom: '2px solid #2563eb', fontWeight: '600' },
  tabAdminActive: { color: '#dc2626', borderBottom: '2px solid #dc2626', fontWeight: '600' },
  paper: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '40px', minHeight: '550px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)' },
  title: { fontSize: '34px', fontFamily: 'Georgia, serif', color: '#0f172a', marginBottom: '4px' },
  subHeading: { fontSize: '22px', marginBottom: '14px' },
  meta: { fontSize: '13px', color: '#64748b', marginBottom: '16px' },
  hr: { border: 'none', borderBottom: '1px solid #e2e8f0', margin: '12px 0 20px 0' },
  bodyText: { fontSize: '16px', lineHeight: '1.8', color: '#334155' },
  historyList: { listStyle: 'none', padding: 0, lineHeight: '2', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none' },
  btnPublish: { background: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', alignSelf: 'flex-start' },
  manageItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' },
  btnDelete: { background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  terminalBox: { background: '#090d16', padding: '20px', borderRadius: '8px', color: '#e2e8f0' },
  codeBlock: { background: '#020617', padding: '16px', borderRadius: '6px', color: '#38bdf8', fontSize: '13px', overflowX: 'auto' },
  modalBg: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: 'white', padding: '24px', borderRadius: '12px', width: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }
};