import { useAuth } from "../lib/AuthContext";
import { LogIn, LogOut, ShieldCheck, HelpCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function UserMenu() {
  const { user, signIn, logout, onlineStatus } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      {user ? (
        <div className="flex items-center gap-2 bg-amber-50 border-2 border-black p-1 px-2.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="h-5 w-5 rounded-full border border-black"
            />
          ) : (
            <div className="h-5 w-5 bg-orange-400 border border-black rounded-full flex items-center justify-center font-bold text-[9px]">
              {user.displayName?.[0] || "?"}
            </div>
          )}
          <span className="font-bold text-black max-w-[80px] truncate hidden sm:inline" title={user.displayName || ""}>
            {user.displayName?.split(" ")[0]}
          </span>
          <button
            id="auth-logout-btn"
            onClick={logout}
            className="p-1 px-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold border border-black rounded flex items-center gap-1 cursor-pointer transition-colors duration-150"
            title={t("signOut")}
          >
            <LogOut className="h-3 w-3" />
            <span className="hidden xs:inline">SignOut</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Guest Mode Indicator */}
          <div className="hidden md:flex items-center gap-1 text-zinc-500 bg-zinc-100 border border-zinc-400 p-1 px-2 rounded font-bold text-[10px] uppercase">
            <HelpCircle className="h-3 w-3" />
            <span>{t("guestMode")}</span>
          </div>

          <button
            id="auth-login-btn"
            onClick={signIn}
            className="p-1.5 px-3 bg-green-400 hover:bg-green-500 text-black font-bold uppercase tracking-wider border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 cursor-pointer transition-transform duration-100 active:translate-x-0.5 active:translate-y-0.5"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>{t("signInGoogle")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
