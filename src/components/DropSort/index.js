import React, {Component} from 'react';

class Index extends Component {
    constructor(props) {
        super(props);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }
    dragStart(e) {
        this.dragged = e.currentTarget;
    }

    dragEnd(e) {
        this.dragged.style.display = 'block';
        if (!e.target || !this.over) return;
        e.target.classList.remove("drag-up");
        this.over.classList.remove("drag-up");
        e.target.classList.remove("drag-down");
        this.over.classList.remove("drag-down");

        let data = this.props.data;
        const from = Number(this.dragged.dataset.id);
        const to = Number(this.over.dataset.id);
        data.splice(to, 0, data.splice(from, 1)[0]);

        // 设置newIndex来判断拖放方向
        data = data.map((doc, index) => {
            doc.newIndex = index + 1;
            return doc;
        });

        this.sortChange(data);
    }

    dragOver(e) {
        this.dragged.style.display = 'none';
        // if (e.target.tagName !== 'DIV') return;

        if (!this.dragged.dataset.item || !e.target.dataset.item) return;
        // 判断当前拖拽的target 和 经过的target【作为newIndex】
        const dgIndex = JSON.parse(this.dragged.dataset.item).newIndex;
        const taIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";

        if (this.over && e.target.dataset.item !== this.over.dataset.item) {
            this.over.classList.remove("drag-up", "drag-down");
        }
        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            this.over = e.target;
        }
    }

    sortChange(data) {
        this.props.dataChange && this.props.dataChange(data);
    }

    render() {
        const { Item } = this.props;
        return (
            <ul onDragOver={this.dragOver}>
                {this.props.data.map((item, i) => (
                    <div
                        data-id={i}
                        data-item={JSON.stringify(item)}
                        key={item.name}
                        style={{padding: '10px', marginBottom: '10px'}}
                        draggable="true"
                        onDragEnd={this.dragEnd}
                        onDragStart={this.dragStart}
                    >
                        <Item item={item} index={i}/>
                    </div>
                ))}
            </ul>
        );
    }
}

export default Index;
