import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { translate } from "../i18n/translations";
import { AppLanguage, AppTheme, UserPreferences } from "../types";

const STORAGE_KEY = "position-manager.preferences";

const defaultPreferences: UserPreferences = {
  language: "zh-CN",
  theme: "light",
};

interface SettingsContextValue extends UserPreferences {
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
  setLanguage: (language: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function readStoredPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultPreferences;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    const language = parsed.language === "en-US" ? "en-US" : "zh-CN";
    const theme = parsed.theme === "dark" ? "dark" : "light";

    return { language, theme };
  } catch {
    return defaultPreferences;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(readStoredPreferences);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme;
    document.documentElement.lang = preferences.language;
  }, [preferences.language, preferences.theme]);

  const t = (key: string) => translate(preferences.language, key);

  return (
    <SettingsContext.Provider
      value={{
        ...preferences,
        isSettingsOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false),
        toggleSettings: () => setIsSettingsOpen((current) => !current),
        setLanguage: (language) =>
          setPreferences((current) => ({
            ...current,
            language,
          })),
        setTheme: (theme) =>
          setPreferences((current) => ({
            ...current,
            theme,
          })),
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }

  return context;
}

export function useI18n() {
  const { language, t } = useSettings();

  return { language, t };
}
