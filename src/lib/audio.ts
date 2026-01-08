export type AudioSource =
  | { kind: 'url'; url: string }
  | { kind: 'speechSynthesis'; text: string; lang?: string; rate?: number; pitch?: number };

export type AudioPlayer = {
  play: () => Promise<void>;
  stop: () => void;
  isPlaying: () => boolean;
};

type ForvoResponse = {
  items?: Array<{
    pathmp3?: string;
    pathogg?: string;
  }>;
};

const getForvoApiKey = (): string | null => {
  if (typeof process === 'undefined') return null;
  const v = process.env.NEXT_PUBLIC_FORVO_API_KEY;
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : null;
};

export const resolveAudioSource = async (opts: {
  koreanText: string;
  explicitUrl?: string;
}): Promise<AudioSource> => {
  const koreanText = (opts.koreanText || '').trim();
  if (!koreanText) {
    return { kind: 'speechSynthesis', text: '', lang: 'ko-KR' };
  }

  if (opts.explicitUrl && opts.explicitUrl.trim().length > 0) {
    return { kind: 'url', url: opts.explicitUrl.trim() };
  }

  const key = getForvoApiKey();
  if (key) {
    try {
      const url = `https://apifree.forvo.com/key/${encodeURIComponent(key)}/format/json/action/word-pronunciations/word/${encodeURIComponent(
        koreanText
      )}/language/ko`;
      const res = await fetch(url);
      if (res.ok) {
        const data = (await res.json()) as ForvoResponse;
        const first = data?.items?.[0];
        const mp3 = first?.pathmp3 || first?.pathogg;
        if (mp3) return { kind: 'url', url: mp3 };
      }
    } catch {}
  }

  return { kind: 'speechSynthesis', text: koreanText, lang: 'ko-KR', rate: 0.9, pitch: 1 };
};

export const createAudioPlayer = (source: AudioSource): AudioPlayer => {
  let audio: HTMLAudioElement | null = null;
  let utterance: SpeechSynthesisUtterance | null = null;
  let playing = false;

  const stop = () => {
    try {
      if (utterance) {
        utterance.onend = null;
        utterance.onerror = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch {}

    try {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    } catch {}

    audio = null;
    utterance = null;
    playing = false;
  };

  const play = async () => {
    if (typeof window === 'undefined') return;

    stop();
    playing = true;

    if (source.kind === 'url') {
      audio = new Audio(source.url);
      await new Promise<void>((resolve) => {
        if (!audio) return resolve();
        audio.onended = () => {
          playing = false;
          audio = null;
          resolve();
        };
        audio.onerror = () => {
          playing = false;
          audio = null;
          resolve();
        };
        audio
          .play()
          .then(() => {})
          .catch(() => {
            playing = false;
            audio = null;
            resolve();
          });
      });
      return;
    }

    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      playing = false;
      return;
    }

    utterance = new SpeechSynthesisUtterance(source.text);
    utterance.lang = source.lang || 'ko-KR';
    utterance.rate = typeof source.rate === 'number' ? source.rate : 0.9;
    utterance.pitch = typeof source.pitch === 'number' ? source.pitch : 1;

    await new Promise<void>((resolve) => {
      if (!utterance) return resolve();
      utterance.onend = () => {
        playing = false;
        utterance = null;
        resolve();
      };
      utterance.onerror = () => {
        playing = false;
        utterance = null;
        resolve();
      };

      try {
        window.speechSynthesis.cancel();
      } catch {}

      window.speechSynthesis.speak(utterance);
    });
  };

  return {
    play,
    stop,
    isPlaying: () => playing
  };
};
