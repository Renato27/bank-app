import { Button } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import './css/ButtonPlus.css';
import { Link } from "react-router-dom";

const ButtunPlus = ({handleAddClick, path}: {handleAddClick: () => void, path: string}) => {
  return (
    <div className="add-button-container"> 
    <Link to={path}>
    <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined style={{ fontSize: '24px' }} />}
        size="large"
        className="floating-button"
        onClick={handleAddClick}
    />
    </Link>
</div>
  );
}

export default ButtunPlus;