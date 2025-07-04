export default function TagInputStyles() {
  return (
    <style>{`
      .ReactTags__tags {
        position: relative;
      }
      .ReactTags__tagInput {
          width: 100%;
          border-radius: 0.375rem;
          background-color: #2d3748; /* gray-800 */
          border: 1px solid #4a5568; /* gray-600 */
          padding: 0.5rem;
          font-size: 1rem;
          line-height: 1.5rem;
      }
      .ReactTags__tagInput:focus {
          border-color: #63b3ed; /* blue-400 */
          box-shadow: 0 0 0 1px #63b3ed;
      }
      .ReactTags__selected .ReactTags__tag {
          background-color: #4a5568; /* gray-600 */
          color: white;
          border: 1px solid #4a5568;
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          margin: 0.25rem;
          display: inline-flex;
          align-items: center;
      }
      .ReactTags__remove {
          color: #fc8181; /* red-400 */
          margin-left: 0.5rem;
          cursor: pointer;
          border: none;
          background: none;
      }
      .ReactTags__suggestions {
        position: absolute;
        z-index: 10;
        background-color: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 0.375rem;
        width: 100%;
      }
      .ReactTags__suggestions ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      .ReactTags__suggestions li {
        padding: 0.5rem;
        border-bottom: 1px solid #4a5568;
      }
      .ReactTags__suggestions li:last-child {
        border-bottom: none;
      }
      .ReactTags__suggestions li mark {
        text-decoration: underline;
        background: none;
        font-weight: 600;
      }
      .ReactTags__suggestions li:hover {
        background-color: #4a5568;
        cursor: pointer;
      }
      .ReactTags__activeSuggestion {
        background-color: #4a5568;
      }
    `}</style>
  );
}
