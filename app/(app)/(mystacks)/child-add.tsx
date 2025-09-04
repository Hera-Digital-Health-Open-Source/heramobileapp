import ChildView from "@/components/children/ChildView";
import Child from "@/interfaces/IChild";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function ChildAdd(){
  const { childId } = useLocalSearchParams();
  const [child, setChild] = useState<Child | undefined>(undefined);
  const { sendRequestFetch } = useHttpClient();
  const { session } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  
  const id = childId ? Number(childId) : undefined;

  
  const getChild = async (childId: number) => {
    // setRefreshing(true);
    let result = await sendRequestFetch<Child[]>({
      url: `/children/`,
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }
  
    const data = result.data!;
    let children = data.filter(c => c.id === childId);
    if(children.length > 0){
      const child = children[0];
      setChild(child);
    } else {
      setChild(undefined);
    }
  };

  useEffect(() => {
    if(id){
      getChild(id);
    }
  }, [id]);

  if(child){
    return (<ChildView introduceText={t('edit_a_child_screen_toolbar_title')} child={child}/>);
  } else {
    return (<ChildView introduceText={t('children_info_screen_add_a_child_button')}/>);
  }
}