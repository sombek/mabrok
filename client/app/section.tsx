import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/nativewindui/Text';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { Checkbox } from '~/components/nativewindui/Checkbox';
import { Stack } from 'expo-router';
import { ESTIMATED_ITEM_HEIGHT, List, ListItem } from '~/components/nativewindui/List';

const Section = () => {
  const { section_id, section_name } = useLocalSearchParams();
  const [tasks, setTasks] = useState<
    {
      created_at: string | null;
      details: string | null;
      name: string;
      section_id: number | null;
      status: string | null;
      task_id: number;
      updated_at: string | null;
      user_id: string | null;
    }[]
  >([]);
  useEffect(() => {
    // Fetch section's tasks
    const fetchTasks = async () => {
      // Fetch tasks
      const response = await supabase.from('tasks').select().eq('section_id', section_id);
      if (response.error) {
        console.error(response.error);
        return;
      }
      setTasks(response.data);
    };
    fetchTasks().then();
  }, []);
  return (
    <View className="flex-col gap-4">
      <Stack.Screen options={{ title: section_name }} />

      <View className="h-full flex-col gap-4">
        <List
          data={tasks?.map((task) => ({
            title: task.name,
            subTitle: task.details,
          }))}
          estimatedItemSize={ESTIMATED_ITEM_HEIGHT.withSubTitle}
          renderItem={(info) => {
            return <ListItem {...info} />;
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
      {/*{// Render tasks*/}
      {/*tasks?.map((task) => (*/}
      {/*  <View key={task.task_id} className="flex-row items-center gap-2">*/}
      {/*    <Checkbox />*/}
      {/*    <Text>{task.name}</Text>*/}
      {/*    <Text>{task.details}</Text>*/}
      {/*  </View>*/}
      {/*))}*/}
    </View>
  );
};

export default Section;
