import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { apiClient } from '../services/api/client';

export type AllowedActions = {
  Read?: boolean;
  Create?: boolean;
  Update?: boolean;
  Delete?: boolean;
  Treatment?: boolean;
};

interface PermissionsState {
  tags: Record<string, boolean>;
  entities: Record<string, AllowedActions>;
}

interface PermissionsContextValue extends PermissionsState {
  isLoading: boolean;
}

const defaultState: PermissionsContextValue = {
  tags: {},
  entities: {},
  isLoading: true,
};

const PermissionsContext = createContext<PermissionsContextValue>(defaultState);

export const useCompartmentalization = () => {
  return useContext(PermissionsContext);
};

const NOTABLE_TAGS = [
  'alma', 'airForce', 'supernova', 'superUser', 'takshal', 
  'editBinat', 'binat', 'PM', 'tmunaAviritRomach', 
  'editJammerHelper', 'fertileLand', 'editOperationalSystem', 'flights'
];

interface PermissionsProviderProps {
  children: React.ReactNode;
  requiredEntities?: string[];
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ 
  children, 
  requiredEntities = ['EnterMagenElyon'] 
}) => {
  const [tags, setTags] = useState<Record<string, boolean>>({});
  const [entities, setEntities] = useState<Record<string, AllowedActions>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch for tags and entities
  useEffect(() => {
    let isMounted = true;

    const fetchInitialPermissions = async () => {
      try {
        // Fetch all tags in parallel
        const tagsPromises = NOTABLE_TAGS.map(async (tagName) => {
          try {
            const hasTag = await apiClient.get<boolean>(`/permissions/userPermissions/tags/${tagName}`);
            return { tagName, hasTag };
          } catch (error) {
            console.error(`Failed to fetch tag ${tagName}:`, error);
            return { tagName, hasTag: false };
          }
        });

        // initial entity fetch
        const entityIdsStr = requiredEntities.join(',');
        const entitiesPromise = apiClient.get<Record<string, AllowedActions>>(
          `/permissions/userPermissions/entities?entityIds=${entityIdsStr}`
        ).catch((err) => {
          console.error("Failed to fetch entities:", err);
          return {} as Record<string, AllowedActions>;
        });

        const [tagsResults, initialEntities] = await Promise.all([
          Promise.all(tagsPromises),
          entitiesPromise,
        ]);

        if (isMounted) {
          const newTags: Record<string, boolean> = {};
          tagsResults.forEach(({ tagName, hasTag }) => {
            newTags[tagName] = hasTag;
          });
          
          setTags(newTags);
          setEntities(initialEntities);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed initializing permissions:", error);
        if (isMounted) setIsLoading(false); // Make sure we don't block forever
      }
    };

    fetchInitialPermissions();

    return () => {
      isMounted = false;
    };
  }, [requiredEntities.join(',')]);

  // Polling for entities every 5 minutes (300,000 ms)
  useEffect(() => {
    const entityIdsStr = requiredEntities.join(',');
    
    const pollEntities = async () => {
      try {
        const fetchedEntities = await apiClient.get<Record<string, AllowedActions>>(
          `/permissions/userPermissions/entities?entityIds=${entityIdsStr}`
        );
        setEntities(fetchedEntities);
      } catch (error) {
        console.error("Error polling entities:", error);
      }
    };

    const intervalId = setInterval(pollEntities, 300_000);

    return () => clearInterval(intervalId);
  }, [requiredEntities.join(',')]);

  const value = useMemo(() => ({ tags, entities, isLoading }), [tags, entities, isLoading]);

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};
