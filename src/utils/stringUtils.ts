export const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);

  if (parts.length >= 2) {
    return parts
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  } else {
    return parts[0].slice(0, 2).toUpperCase();
  }
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }

  return color;
};
