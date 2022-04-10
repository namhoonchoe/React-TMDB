import React, { useState, useEffect } from "react";
import PersonPresenter from "./PersonPresenter";
import { selectPage } from "@redux/peopleSlice";
import { useSelector } from "react-redux";
import { personApi } from "@api";

interface IPersonPopular {
  popular: Array<IPersonData>;
}

const PersonContainer: React.FC = () => {
  const [person, setPerson] = useState<IPersonPopular>({
    popular: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { page } = useSelector(selectPage)


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let mounted = true;

    const getPersonData = async () => {
      try {
        const {
          data: { results: popular },
        } = await personApi.popular(page);
        setPerson({ ...person, popular });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (mounted) {
      getPersonData();
    }
    return () => {
      mounted = false;
      scrollToTop();
    };
  }, [page]);

  const { popular } = person;
  return (
    <PersonPresenter
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

export default PersonContainer;
