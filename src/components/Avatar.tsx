import { useMemo } from 'react';
import { getInitials, stringToColor } from '../utils/stringUtils';

export const Avatar = ({ name }: any) => {
  const initials = getInitials(name);
  const bgColor = useMemo(() => stringToColor(name), [name]);

  return (
    <div
      className="text-[12px]"
      style={{
        backgroundColor: bgColor,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'light',
      }}
    >
      {initials}
    </div>
  );
};
