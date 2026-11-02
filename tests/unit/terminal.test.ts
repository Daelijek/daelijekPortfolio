import { describe, expect, it, vi } from 'vitest';
import { completeCommand, runCommand, type CommandContext } from '../../src/components/terminal/commands';

function makeCtx(overrides: Partial<CommandContext> = {}): CommandContext {
  return {
    soundEnabled: true,
    setTheme: vi.fn(),
    setSoundEnabled: vi.fn(),
    switchLocale: vi.fn(),
    navigate: vi.fn(),
    openUrl: vi.fn(),
    downloadCv: vi.fn(),
    celebrate: vi.fn(),
    playError: vi.fn(),
    ...overrides,
  };
}

const text = (result: ReturnType<typeof runCommand>) =>
  result.kind === 'output' ? result.lines.map((l) => ('content' in l ? l.content : '')).join('\n') : result.kind;

describe('runCommand', () => {
  it('lists every case study and help mentions all commands', () => {
    const ctx = makeCtx();
    expect(text(runCommand('projects', ctx))).toMatch(/fintrack[\s\S]*rolesieve[\s\S]*opengov[\s\S]*berik/);
    expect(text(runCommand('help', ctx))).toContain('sudo hire dias');
  });

  it('navigates to case studies by alias', () => {
    const ctx = makeCtx();
    runCommand('open finance', ctx);
    runCommand('OPEN Berik', ctx);
    expect(ctx.navigate).toHaveBeenNthCalledWith(1, '/projects/finance-management-app');
    expect(ctx.navigate).toHaveBeenNthCalledWith(2, '/projects/berik-zhunusbek');
    expect(text(runCommand('open nope', makeCtx()))).toContain('Unknown project');
  });

  it('validates theme and language arguments', () => {
    const ctx = makeCtx();
    runCommand('theme cyan', ctx);
    expect(ctx.setTheme).toHaveBeenCalledWith('cyan');
    expect(text(runCommand('theme pink', ctx))).toContain('Usage: theme');

    runCommand('lang kk', ctx);
    expect(ctx.switchLocale).toHaveBeenCalledWith('kk');
    expect(text(runCommand('lang kz', ctx))).toContain('Usage: lang');
  });

  it('toggles audio and reports state', () => {
    const ctx = makeCtx({ soundEnabled: false });
    runCommand('audio on', ctx);
    expect(ctx.setSoundEnabled).toHaveBeenCalledWith(true);
    expect(text(runCommand('audio', ctx))).toContain('MUTED');
  });

  it('returns control results for clear/exit and runs side effects for cv/hire', () => {
    const ctx = makeCtx();
    expect(runCommand('clear', ctx)).toEqual({ kind: 'clear' });
    expect(runCommand('exit', ctx)).toEqual({ kind: 'close' });
    runCommand('cv', ctx);
    expect(ctx.downloadCv).toHaveBeenCalledOnce();
    expect(text(runCommand('sudo hire dias', ctx))).toContain('ACCESS GRANTED');
    expect(ctx.celebrate).toHaveBeenCalledOnce();
  });

  it('reports unknown commands with an error sound', () => {
    const ctx = makeCtx();
    expect(text(runCommand('rm -rf /', ctx))).toContain('command not found');
    expect(ctx.playError).toHaveBeenCalledOnce();
  });
});

describe('completeCommand', () => {
  it('completes partial input and ignores empty input', () => {
    expect(completeCommand('sk')).toBe('skills');
    expect(completeCommand('theme cr')).toBe('theme crimson');
    expect(completeCommand('open ber')).toBe('open berik');
    expect(completeCommand('   ')).toBeNull();
    expect(completeCommand('zzz')).toBeNull();
  });
});
