import React from 'react'
import { Stack, Form, Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../App'
import { v4 as uuidV4 } from 'uuid'


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export const NoteForm = ({ onSubmit, onAddTag, availableTags, title="", markdown="", tags=[] }:NoteFormProps) => {
    const titleRef = React.useRef<HTMLInputElement>(null)
    const markdownRef = React.useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        onSubmit({
            title: titleRef.current?.value || '',
            markdown: markdownRef.current?.value || '',
            tags: selectedTags
        })

        navigate('..')
    }

  return (
      <Form onSubmit={handleSubmit}>
          <Stack gap={1}>
              <Row>
                  <Col>
                      <Form.Group controlId="title">
                          <Form.Label >Title</Form.Label>
                          <Form.Control ref={titleRef} required defaultValue={title} type="text" placeholder='Enter title'  />
                        </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group controlId="title">
                          <Form.Label>Tags</Form.Label>
                          <CreatableReactSelect
                              onCreateOption={label => {
                                  const newTag = { id: uuidV4(), label }
                                  onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                              }}
                              
                              value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                              })}
                              options={availableTags.map(tag => {
                                  return { label: tag.label, value: tag.id }
                              })}
                              
                              onChange={(tags) => {
                                  setSelectedTags(tags.map(tag => {
                                      return { id: tag.value, label: tag.label }
                                  }))
                              }}
                              isMulti />
                        </Form.Group>
                  </Col>
              </Row>
              <Form.Group controlId="markdown">
                          <Form.Label>Body</Form.Label>
                            <Form.Control ref={markdownRef} defaultValue={markdown} required as="textarea" rows={15} placeholder="Enter body" />
              </Form.Group>
              <Stack direction="horizontal" gap={2} className="justify-content-end">
                  <Button type="submit" variant="primary">Save</Button>
                  <Link to="..">
                      <Button type="button" variant="outline-secondary">Cancel</Button>
                      </Link>
              </Stack>
          </Stack>
    </Form>
  )
}
