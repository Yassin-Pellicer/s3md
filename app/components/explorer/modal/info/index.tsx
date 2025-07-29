import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { hooks } from './hook';

const FolderMenu = ({ onMove, onEdit, onDelete }: { onMove: () => void; onEdit?: () => void; onDelete: () => void; }) => {
  const useInfoHooks = hooks(onMove, onDelete, onEdit);

  return (
    <>
      <IconButton
        className="!h-fit !min-h-0"
        onClick={useInfoHooks.handleClick}
        style={{ padding: 0 }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
      </IconButton>
      <Menu
        anchorEl={useInfoHooks.anchorEl}
        open={useInfoHooks.open}
        onClose={useInfoHooks.handleClose}
        PaperProps={{
          className: "!rounded-[12px] pt-[0px]",
          elevation: 2,
        }}
        MenuListProps={{
          className: "!p-0",
        }}
      >
        <MenuItem onClick={() => useInfoHooks.handleAction(onMove)}>
          <ListItemIcon>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              drive_file_move
            </span>
          </ListItemIcon>
          <ListItemText primary={<span className="text-xs">Move</span>} />
        </MenuItem>

        {onEdit && <MenuItem onClick={() => useInfoHooks.handleAction(onEdit)}>
          <ListItemIcon>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              edit
            </span>
          </ListItemIcon>
          <ListItemText primary={<span className="text-xs">Edit</span>} />
        </MenuItem>}

        <MenuItem
          onClick={() => useInfoHooks.handleAction(onDelete)}
          className="!bg-red-600 hover:!bg-red-700 text-white"
        >
          <ListItemIcon>
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: '18px' }}
            >
              delete
            </span>
          </ListItemIcon>
          <ListItemText primary={<span className="text-xs text-white">Delete</span>} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FolderMenu;
