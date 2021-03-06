import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { getSearchTerm } from "@redux/searchSlice";
import { useDispatch } from "react-redux";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import {
  Input,
  Tooltip,
  ScaleFade,
  useOutsideClick,
} from "@chakra-ui/react";
import { CenteredBox } from "./Display/BasicLayouts";

const SearchBox: React.FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const ref = useRef<HTMLFormElement>(null);

  const openSearchBox = () => {
    setClicked(true);
  };

  const closeSearchBox = () => {
    setClicked(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getSearchTerm(term));
    setTerm("");
  };

  useOutsideClick({
    ref: ref,
    handler: () => closeSearchBox(),
  });

  return (
    <>
      <CenteredBox width="max">
        {clicked ? (
          <form onSubmit={onSubmit} ref={ref}>
            <ScaleFade in={clicked}>
              <CenteredBox h={4}>
                <Input
                  value={term}
                  onChange={onChange}
                  placeholder="Search"
                  mr={2}
                />
                <CloseIcon onClick={() => closeSearchBox()} />
              </CenteredBox>
            </ScaleFade>
          </form>
        ) : (
          <Tooltip label="Search Movies or Series" aria-label="A tooltip">
            <Search2Icon w={4} h={4} onClick={() => openSearchBox()} />
          </Tooltip>
        )}
      </CenteredBox>
    </>
  );
};

export default SearchBox;
