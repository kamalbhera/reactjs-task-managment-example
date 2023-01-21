import { useState } from 'react'
import { v4 } from 'uuid'
import { tagsList } from '../../data'
import {
  HomeContainer,
  CreateTaskContainer,
  CreateForm,
  FormHeading,
  LabelInputContainer,
  Label,
  Input,
  SelectInput,
  OptionInput,
  Button,
  AddTaskContainer,
  TagsHeading,
  TagsListUl,
  TagsList,
  TagsButton,
  TaskListUl,
  TaskListLi,
  TaskText,
  TaskTag,
  NoTaskText,
} from './styledComponents'

// These are the lists used in the application. You can move them to any component needed.

const Home = () => {
  const [activeTag, setActiveTag] = useState('INITIAL');
  const [inputText, setInputText] = useState('');
  const [inputTag, setInputTag] = useState('');
  const [taskList, setTaskList] = useState([]);

  const submitForm = event => {
    event.preventDefault()
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    setTaskList([...taskList, newTask]);

  }
  const filterTaskList = () => {
    const filterTaskList = activeTag === 'INITIAL' ? taskList : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  return (
    <HomeContainer>
      <CreateTaskContainer>
        <CreateForm onSubmit={submitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelInputContainer>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              placeholder="Enter the task here"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              id="inputText"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={(e) => setInputTag(e.target.value)}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputContainer>
          <Button type="submit">Add Task</Button>
        </CreateForm>
      </CreateTaskContainer>
      <AddTaskContainer>
        <TagsHeading>Tags</TagsHeading>
        <TagsListUl>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagsList key={each.optionId}>
                <TagsButton
                  type="button"
                  value={each.optionId}
                  onClick={() => setActiveTag(each.optionId)}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagsButton>
              </TagsList>
            )
          })}
        </TagsListUl>
        <TagsHeading>Tasks</TagsHeading>
        <TaskListUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            filterTaskList()
          )}
        </TaskListUl>
      </AddTaskContainer>
    </HomeContainer>
  )
}
export default Home
