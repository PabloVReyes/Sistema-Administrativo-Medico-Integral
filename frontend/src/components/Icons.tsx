import React from "react";
import {
  UsersIcon,
  CheckIcon,
  XCircleIcon,
  LockIcon,
  LockOpenIcon,
  FilterIcon,
  HeartIcon,
  InfoIcon,
  MenuIcon,
  KeyIcon,
  PlusIcon,
  EyeIcon,
  PenIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  CalendarIcon,
  PackageIcon,
  ShieldIcon,
  PillIcon,
  BarChart2Icon,
  FileTextIcon,
  DatabaseIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  RotateCcwIcon,
  DownloadIcon,
} from "lucide-react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Mapeo de iconos personalizados a los de lucide-react
// IcHome y IcPatients ambos usan UsersIcon por compatibilidad
export const IcHome = ({ size = 18, className = "" }: IconProps) => <UsersIcon size={size} className={className} />;
export const IcPatients = ({ size = 18, className = "" }: IconProps) => <UsersIcon size={size} className={className} />;
export const IcClipboard = ({ size = 18, className = "" }: IconProps) => <PackageIcon size={size} className={className} />;
export const IcCalendar = ({ size = 18, className = "" }: IconProps) => <CalendarIcon size={size} className={className} />;
export const IcStaff = ({ size = 18, className = "" }: IconProps) => <UsersIcon size={size} className={className} />;
export const IcUsers = ({ size = 18, className = "" }: IconProps) => <UsersIcon size={size} className={className} />;
export const IcShield = ({ size = 18, className = "" }: IconProps) => <ShieldIcon size={size} className={className} />;
export const IcPill = ({ size = 18, className = "" }: IconProps) => <PillIcon size={size} className={className} />;
export const IcChart = ({ size = 18, className = "" }: IconProps) => <BarChart2Icon size={size} className={className} />;
export const IcAudit = ({ size = 18, className = "" }: IconProps) => <FileTextIcon size={size} className={className} />;
export const IcDatabase = ({ size = 18, className = "" }: IconProps) => <DatabaseIcon size={size} className={className} />;
export const IcSettings = ({ size = 18, className = "" }: IconProps) => <SettingsIcon size={size} className={className} />;
export const IcBell = ({ size = 20, className = "" }: IconProps) => <BellIcon size={size} className={className} />;
export const IcSearch = ({ size = 16, className = "" }: IconProps) => <SearchIcon size={size} className={className} />;
export const IcPlus = ({ size = 16, className = "" }: IconProps) => <PlusIcon size={size} className={className} />;
export const IcEye = ({ size = 15, className = "" }: IconProps) => <EyeIcon size={size} className={className} />;
export const IcEdit = ({ size = 15, className = "" }: IconProps) => <PenIcon size={size} className={className} />;
export const IcTrash = ({ size = 15, className = "" }: IconProps) => <TrashIcon size={size} className={className} />;
export const IcChevronRight = ({ size = 16, className = "" }: IconProps) => <ChevronRightIcon size={size} className={className} />;
export const IcChevronDown = ({ size = 16, className = "" }: IconProps) => <ChevronDownIcon size={size} className={className} />;
export const IcLogout = ({ size = 17, className = "" }: IconProps) => <LogOutIcon size={size} className={className} />;
export const IcCheck = ({ size = 15, className = "" }: IconProps) => <CheckIcon size={size} className={className} />;
export const IcX = ({ size = 15, className = "" }: IconProps) => <XCircleIcon size={size} className={className} />;
export const IcUserX = ({ size = 15, className = "" }: IconProps) => <XCircleIcon size={size} className={className} />;
export const IcAlert = ({ size = 15, className = "" }: IconProps) => {
  // Renderizar SVG simple para alerta ya que Lucide no tiene AlertIcon estándar
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
};
export const IcDownload = ({ size = 15, className = "" }: IconProps) => <DownloadIcon size={size} className={className} />;
export const IcRefresh = ({ size = 15, className = "" }: IconProps) => <RotateCcwIcon size={size} className={className} />;
export const IcLock = ({ size = 15, className = "" }: IconProps) => <LockIcon size={size} className={className} />;
export const IcLockOpen = ({ size = 15, className = "" }: IconProps) => <LockOpenIcon size={size} className={className} />;
export const IcFilter = ({ size = 15, className = "" }: IconProps) => <FilterIcon size={size} className={className} />;
export const IcHospital = ({ size = 36, className = "" }: IconProps) => <HeartIcon size={size} className={className} />;
export const IcInfo = ({ size = 15, className = "" }: IconProps) => <InfoIcon size={size} className={className} />;
export const IcMenu = ({ size = 16, className = "" }: IconProps) => <MenuIcon size={size} className={className} />;
export const IcKey = ({ size = 15, className = "" }: IconProps) => <KeyIcon size={size} className={className} />;