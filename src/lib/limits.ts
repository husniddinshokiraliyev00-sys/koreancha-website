import { useUser } from '../app/providers';

export function useDailyLimit(feature: 'flashcards' | 'quiz') {
  const { user, profile, isPremium, canAccessFeature } = useUser();

  const limits = {
    flashcards: 50,
    quiz: 3,
  };

  const checkLimit = async () => {
    if (isPremium) return { allowed: true, remaining: Infinity };
    if (!user) return { allowed: false, remaining: 0 };

    const { supabase } = await import('./supabase');
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (error || !data) {
      await supabase.from('daily_usage').insert({
        user_id: user.id,
        date: today,
        [feature === 'flashcards' ? 'flashcards_reviewed' : 'quizzes_taken']: 0,
      });
      return { allowed: true, remaining: limits[feature] };
    }

    const current = data[feature === 'flashcards' ? 'flashcards_reviewed' : 'quizzes_taken'] || 0;
    const remaining = Math.max(0, limits[feature] - current);

    return {
      allowed: current < limits[feature],
      remaining,
    };
  };

  const incrementUsage = async () => {
    if (isPremium || !user) return;

    const { supabase } = await import('./supabase');
    const today = new Date().toISOString().split('T')[0];

    const field = feature === 'flashcards' ? 'flashcards_reviewed' : 'quizzes_taken';

    await supabase.rpc('increment_daily_usage', {
      p_user_id: user.id,
      p_date: today,
      p_field: field,
    });
  };

  return {
    checkLimit,
    incrementUsage,
    isPremium,
    canAccess: canAccessFeature(feature),
    limit: limits[feature],
  };
}
