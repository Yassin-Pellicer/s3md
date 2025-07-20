import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { hooks } from './hook';

const FolderMenu = ({ onMove, onEdit, onDelete }: { onMove: () => void; onEdit: () => void; onDelete: () => void; }) => {
  const useInfoHooks = hooks(onMove, onDelete, onEdit);

  return (
    <>
      <IconButton onClick={useInfoHooks.handleClick}>
        <i className="material-symbols-outlined text-[20px]">more_vert</i>
      </IconButton>
      <Menu
        anchorEl={useInfoHooks.anchorEl}
        open={useInfoHooks.open}
        onClose={useInfoHooks.handleClose}
        PaperProps={{ className: "text-sm" }} // this applies to the whole menu
      >
        <MenuItem onClick={() => useInfoHooks.handleAction(onMove)}>
          <ListItemIcon>
            <span className="material-symbols-outlined text-sm">drive_file_move</span>
          </ListItemIcon>
          <ListItemText
            primary={<span className="text-sm">Move</span>}
          />
        </MenuItem>
        <MenuItem onClick={() => useInfoHooks.handleAction(onEdit)}>
          <ListItemIcon>
            <span className="material-symbols-outlined text-sm">edit</span>
          </ListItemIcon>
          <ListItemText
            primary={<span className="text-sm">Edit</span>}
          />
        </MenuItem>
        <MenuItem onClick={() => useInfoHooks.handleAction(onDelete)}>
          <ListItemIcon>
            <span className="material-symbols-outlined text-sm">delete</span>
          </ListItemIcon>
          <ListItemText
            primary={<span className="text-sm">Delete</span>}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FolderMenu;
