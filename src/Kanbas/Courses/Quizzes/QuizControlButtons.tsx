import React, { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  FaCheckCircle,
  FaCircle,
  FaPencilAlt,
  FaTrash,
  FaGlobe,
  FaCopy,
  FaSort,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

export default function QuizControlButtons() {
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handlePublishToggle = () => {};

  return (
    <div className="d-flex">
      <span className="me-1 position-relative">
        <FaCheckCircle
          style={{ top: "2px" }}
          className="text-success me-1 position-absolute fs-5"
        />
        <FaCircle className="text-white me-1 fs-6" />
      </span>
      <Dropdown align="end">
        <Dropdown.Toggle
          as="div"
          className="cursor-pointer"
          id="lesson-control-dropdown"
        >
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleEdit}>
            <FaPencilAlt className="me-2" />
            Edit
          </Dropdown.Item>

          <Dropdown.Item onClick={handleDelete}>
            <FaTrash className="me-2" />
            Delete
          </Dropdown.Item>

          <Dropdown.Item onClick={handlePublishToggle}>
            <FaGlobe className="me-2" />
            {/* {isPublished ? "Unpublish" : "Publish"} */}
            "Unpublish"
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item
            as="button"
            // onClick={() => onCopy?.(quizId)}
          >
            <FaCopy className="me-2" />
            Copy to...
          </Dropdown.Item>

          <Dropdown.Item as="button">
            <FaSort className="me-2" />
            Sort by
            <Dropdown>
              <Dropdown.Toggle as="span" className="float-end">
                ›
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item onClick={() => onSort?.('name')}>
                  Name
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort?.('dueDate')}>
                  Due Date
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
