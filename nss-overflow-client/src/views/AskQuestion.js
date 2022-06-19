import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { createThread } from '../data/threadData';
import { getCreateTags } from '../data/tagData';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { modules } from '../quillModules';

export default function AskQuestion() {
  const [title, setTitle] = useState({ input: '' });
  const [editorText, setEditorText] = useState('');
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState(null);

  useEffect(() => {
    getCreateTags().then(setTagList);
  }, []);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(() => ({ input: e.target.value }));
  };

  const submitQuestion = async () => {
    const tags = selectedTags.map((tag) => tag.value);
    const thread = {
      Title: title.input,
      PostBody: editorText,
      TagIdList: tags,
    };

    const newThreadId = await createThread(thread);
    navigate(`/questions/${newThreadId}`);
  };

  return (
    <div className='ask-container'>
      <Form>
        <FormGroup>
          <Label for='titleInput'>Title</Label>
          <Input
            id='titleInput'
            className='ask-input'
            name='Title'
            placeholder='Enter a title for your question'
            type='text'
            value={title.input}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <ReactQuill theme='snow' modules={modules} onChange={setEditorText} />
        </FormGroup>
        <Label for='tagSelect'>Tags</Label>
        <Select
          id='tagSelect'
          value={selectedTags}
          placeholder='Select up to 3 tags'
          options={tagList}
          onChange={(v) => (v.length < 4 ? setSelectedTags(v) : null)}
          isMulti={true}
        />
        <button
          className='ask-submit-btn blue-btn'
          type='button'
          onClick={() => submitQuestion(editorText)}
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
