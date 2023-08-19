import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      console.log("No song ID provided.");
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      console.log("Fetching song data...");
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error fetching song data:", error);
        setIsLoading(false);
        return toast.error(error.message);
      }

      console.log("Song data fetched:", data);
      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => {
    console.log("Returning memoized values:", { isLoading, song });
    return {
      isLoading,
      song,
    };
  }, [isLoading, song]);
};

export default useSongById;
