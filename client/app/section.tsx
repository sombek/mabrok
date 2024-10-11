import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { ESTIMATED_ITEM_HEIGHT, List, ListItem } from '~/components/nativewindui/List';
import { Icon } from '@roninoss/icons';
import { BackButton } from '~/components/BackButton';

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
      <Stack.Screen
        options={{
          title: section_name,
          headerLeft: () => <BackButton onPress={() => router.back()} />,
        }}
      />

      <View className="h-full flex-col gap-4">
        <List
          data={tasks?.map((task) => ({
            task_id: task.task_id,
            title: task.name,
            subTitle: task.details,
          }))}
          estimatedItemSize={ESTIMATED_ITEM_HEIGHT.withSubTitle}
          renderItem={(info) => {
            console.log(info);
            return (
              <ListItem
                titleClassName="text-left"
                subTitleClassName="text-left"
                onPress={() => {
                  router.push(`/task?task_id=${info.item.task_id}`);
                }}
                rightView={
                  <View className="flex-1 justify-center px-4">
                    <Icon name="chevron-left" size={24} />
                  </View>
                }
                {...info}
              />
            );
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
