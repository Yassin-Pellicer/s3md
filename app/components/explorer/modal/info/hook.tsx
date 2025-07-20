import { useState } from 'react';

export function hooks (onMove: () => void, onDelete: () => void, onEdit: () => void) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  return {
    anchorEl,
    open,
    handleAction,
    handleClose,
    handleClick,
  };
}
