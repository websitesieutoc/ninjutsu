import sanitizer from 'sanitize-html';

// This helper mostly uses for pagination query: skip, take etc
export const parseQuery = (query?: string | string[] | number) => {
  if (Array.isArray(query)) {
    throw new Error('We do not use Array of string in query');
  }

  if (typeof query === 'number') {
    return query;
  }

  if (typeof query === 'string' && query.length > 0) {
    const parsed = parseInt(query, 10);

    if (Number.isNaN(parsed)) {
      throw new Error('Query contains invalid characters');
    } else {
      return parsed;
    }
  }

  return undefined;
};

export const exclude = <T extends Record<string, unknown>, K extends keyof T>(
  data: T,
  keys: K | K[]
): Omit<T, K> => {
  const result = { ...data };

  if (Array.isArray(keys)) {
    keys.forEach((key) => delete result[key]);
    return result;
  }

  delete result[keys];
  return result;
};

export const htmlSanitizer = (textWithHTML?: string | null): string => {
  if (!textWithHTML) return '';

  return sanitizer(textWithHTML, {
    allowedTags: [],
  });
};

export const inputSanitizer = (input?: string | null): string => {
  if (!input) return '';

  return sanitizer(input, {
    allowedTags: [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'em',
      'span',
      'strong',
    ],
  });
};
