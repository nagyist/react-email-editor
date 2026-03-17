import { CSSProperties } from 'react';

import type {
  AppearanceConfig,
  DisplayMode,
  ToolsConfig,
  UnlayerEditor,
  UnlayerEmbed,
  UnlayerOptions,
} from '@unlayer/types';

export interface EditorRef {
  editor: UnlayerEditor | null;
}

export interface EmailEditorProps {
  editorId?: string | undefined;
  minHeight?: number | string | undefined;
  onLoad?(unlayer: UnlayerEditor): void;
  onReady?(unlayer: UnlayerEditor): void;
  options?: UnlayerOptions | undefined;
  scriptUrl?: string | undefined;
  style?: CSSProperties | undefined;

  // redundant props -- already available in options
  /** @deprecated */
  appearance?: AppearanceConfig | undefined;
  /** @deprecated */
  displayMode?: DisplayMode;
  /** @deprecated */
  locale?: string | undefined;
  /** @deprecated */
  projectId?: number | undefined;
  /** @deprecated */
  tools?: ToolsConfig | undefined;
}

declare global {
  const unlayer: UnlayerEmbed;

  interface Window {
    __unlayer_lastEditorId: number;
  }
}
