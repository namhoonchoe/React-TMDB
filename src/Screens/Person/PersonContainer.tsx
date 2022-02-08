import React, { useState, useEffect } from "react";
import PersonPresenter from "./PersonPresenter";
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

  useEffect(() => {
    let mounted = true;
    const getPersonData = async () => {
      try {
        const {
          data: { results: popular },
        } = await personApi.popular();
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
    };
  }, []);

  const { popular } = person;
  return <PersonPresenter popular={popular} error={error} loading={loading} />;
};

export default PersonContainer;
