import React, { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps, User } from "../../types/types";

interface IFilterProps extends FilterDropdownProps {
  filterValue: string | null;
  setFilterValue: (props: string | null) => void;
  placeholder: string;
}

const FilterDropdown = ({
  filterValue,
  setFilterValue,
  placeholder,
  confirm,
}: IFilterProps) => {
  const [value, setValue] = useState<any>(filterValue);

  const handleOk = (e: any) => {
    if (e) e.preventDefault();
    setFilterValue(value);
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={handleOk}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        className="bg-blue-500"
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90, marginRight: 8 }}
        onClick={handleOk}
      >
        Traži
      </Button>
      <Button
        size="small"
        style={{ width: 90 }}
        onClick={(e) => {
          e.preventDefault();
          setValue(null);
          setFilterValue(null);
          confirm();
        }}
      >
        Resetuj
      </Button>
    </div>
  );
};

export default FilterDropdown;
