import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './GitHubArchiveModal.module.css';

const GITHUB_USER = 'Daelijek';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`;

function GitHubArchiveModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to load repositories');
      const data = await res.json();
      setRepos(data.filter((r) => !r.archived));
    } catch (err) {
      setError(err.message);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchRepos();
  }, [isOpen, fetchRepos]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="archive-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="archive-modal-title" className={styles.title}>
            {t('projects.archiveModalTitle')}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('projects.archiveModalClose')}
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          {loading && (
            <p className={styles.message}>{t('projects.archiveModalLoading')}</p>
          )}
          {error && (
            <p className={styles.error}>
              {t('projects.archiveModalError')} {error}
            </p>
          )}
          {!loading && !error && repos.length === 0 && !error && (
            <p className={styles.message}>{t('projects.archiveModalEmpty')}</p>
          )}
          {!loading && !error && repos.length > 0 && (
            <ul className={styles.list}>
              {repos.map((repo) => (
                <li key={repo.id} className={styles.item}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <span className={styles.repoName}>{repo.name}</span>
                    {repo.description && (
                      <p className={styles.repoDesc}>{repo.description}</p>
                    )}
                    <div className={styles.meta}>
                      {repo.language && (
                        <span className={styles.lang}>{repo.language}</span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className={styles.stars}>
                          ★ {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default GitHubArchiveModal;
