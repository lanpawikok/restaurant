import { TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function FilterComp({ updateSearchValue, sortProduct }) {
    return (
        <div className="flex justify-center gap-3 mx-10 mb-8">

            <div className="w-96">
                <TextInput
                    id="search"
                    type="text"
                    icon={IoSearch}
                    placeholder="Cari berdasarkan nama makanan..."
                    onKeyUp={updateSearchValue}
                    sizing="md"
                />
            </div>

            <Dropdown
                label="Urutkan Data"
                color="alternative"
                dismissOnClick={true}
            >
                <DropdownItem onClick={() => sortProduct("harga termurah")}>Harga Termurah</DropdownItem>
                <DropdownItem onClick={() => sortProduct("harga termahal")}>Harga Termahal</DropdownItem>
                <DropdownItem onClick={() => sortProduct("alfabet a-z")}>Alfabet A-Z</DropdownItem>
                <DropdownItem onClick={() => sortProduct("alfabet z-a")}>Alfabet Z-A</DropdownItem>
            </Dropdown>

        </div>
    );
}